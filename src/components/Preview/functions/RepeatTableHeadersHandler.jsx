import { registerHandlers, Handler } from "pagedjs";

class RepeatTableHeadersHandler extends Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.splitTablesRefs = [];
    }

    afterPageLayout(pageElement, page, breakToken, chunker) {
        this.chunker = chunker;
        this.splitTablesRefs = [];

        if (breakToken) {
            const node = breakToken.node;
            const tables = this.findAllAncestors(node, "table");
            if (node.tagName === "TABLE") tables.push(node);

            if (tables.length > 0) {
                this.splitTablesRefs = tables.map((t) => t.dataset.ref);
                let thead = node.tagName === "THEAD" ? node : this.findFirstAncestor(node, "thead");
                if (thead && thead.lastElementChild) {
                    breakToken.node = this.nodeAfter(thead.lastElementChild, chunker.source);
                }
                this.hideEmptyTables(pageElement, node);
            }
        }
    }

    hideEmptyTables(pageElement, breakTokenNode) {
        this.splitTablesRefs.forEach((ref) => {
            let table = pageElement.querySelector(`[data-ref='${ref}']`);
            if (table) {
                let sourceBody = table.querySelector("tbody > tr");
                if (!sourceBody || (sourceBody.children.length < 2 && this.refEquals(sourceBody.firstElementChild, breakTokenNode))) {
                    // table.style.visibility = "hidden";
                    table.style.position = "absolute";
                }
            }
        });
    }

    layout(rendered, layout) {
        this.splitTablesRefs.forEach((ref) => {
            const renderedTable = rendered.querySelector(`[data-ref='${ref}']`);
            if (renderedTable && !renderedTable.getAttribute("repeated-headers")) {
                const sourceTable = this.chunker.source.querySelector(`[data-ref='${ref}']`);
                this.repeatColgroup(sourceTable, renderedTable);
                this.repeatTHead(sourceTable, renderedTable);
                // this.repeatTFoot(sourceTable, renderedTable);
                renderedTable.setAttribute("repeated-headers", true);
            }
        });
    }

    repeatColgroup(sourceTable, renderedTable) {
        let colgroups = sourceTable.querySelectorAll("colgroup");
        colgroups.forEach((colgroup) => {
            let clonedColgroup = colgroup.cloneNode(true);
            renderedTable.insertBefore(clonedColgroup, renderedTable.firstChild);
        });
    }

    repeatTHead(sourceTable, renderedTable) {
        let thead = sourceTable.querySelector("thead");
        if (thead && !renderedTable.querySelector("thead")) {
            let clonedThead = thead.cloneNode(true);
            renderedTable.insertBefore(clonedThead, renderedTable.firstChild);
        }
    }

    // repeatTFoot(sourceTable, renderedTable) {
    //   let tfoot = sourceTable.querySelector("tfoot");
    //   if (tfoot && !renderedTable.querySelector("tfoot")) {
    //     let clonedTFoot = tfoot.cloneNode(true);
    //     renderedTable.appendChild(clonedTFoot);
    //   }
    // }


    findFirstAncestor(element, selector) {
        while (element.parentNode && element.parentNode.nodeType === 1) {
            if (element.parentNode.matches(selector)) return element.parentNode;
            element = element.parentNode;
        }
        return null;
    }

    findAllAncestors(element, selector) {
        const ancestors = [];
        while (element.parentNode && element.parentNode.nodeType === 1) {
            if (element.parentNode.matches(selector)) ancestors.unshift(element.parentNode);
            element = element.parentNode;
        }
        return ancestors;
    }

    nodeAfter(node, limiter) {
        if (limiter && node === limiter) return;
        let significantNode = this.nextSignificantNode(node);
        if (significantNode) return significantNode;
        while ((node = node.parentNode)) {
            if (limiter && node === limiter) return;
            significantNode = this.nextSignificantNode(node);
            if (significantNode) return significantNode;
        }
    }

    nextSignificantNode(sib) {
        while ((sib = sib.nextSibling)) {
            if (!this.isIgnorable(sib)) return sib;
        }
        return null;
    }

    isIgnorable(node) {
        return node.nodeType === 8 || (node.nodeType === 3 && this.isAllWhitespace(node));
    }

    isAllWhitespace(node) {
        return !/[^\t\n\r ]/.test(node.textContent);
    }
}

export default RepeatTableHeadersHandler;