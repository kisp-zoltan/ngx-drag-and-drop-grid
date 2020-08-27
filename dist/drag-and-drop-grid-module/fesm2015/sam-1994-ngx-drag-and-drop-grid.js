import { Directive, TemplateRef, ViewContainerRef, Component, ChangeDetectorRef, Input, ViewChildren, ContentChildren, ViewChild, NgModule } from '@angular/core';
import { moveItemInArray, CdkDropListGroup, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SamDragAndDropListDataDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
SamDragAndDropListDataDirective.decorators = [
    { type: Directive, args: [{
                selector: '[samDragAndDropListData]'
            },] }
];
/** @nocollapse */
SamDragAndDropListDataDirective.ctorParameters = () => [
    { type: TemplateRef }
];
class SamDragAndDropListContentOutletDirective {
    /**
     * @param {?} viewContainer
     */
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
    }
}
SamDragAndDropListContentOutletDirective.decorators = [
    { type: Directive, args: [{ selector: '[samContentOutlet]' },] }
];
/** @nocollapse */
SamDragAndDropListContentOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
class SamDragAndDropGridComponent {
    /**
     * @param {?} changeDetector
     * @param {?} viewportRuler
     */
    constructor(changeDetector, viewportRuler) {
        this.changeDetector = changeDetector;
        this.viewportRuler = viewportRuler;
        this.columnNumber = 1;
        this.enter = (/**
         * @param {?} drag
         * @param {?} drop
         * @return {?}
         */
        (drag, drop) => {
            if (drop === this.placeholder) {
                return true;
            }
            if (drop !== this.activeContainer) {
                return false;
            }
            /** @type {?} */
            const phElement = this.placeholder.element.nativeElement;
            /** @type {?} */
            const sourceElement = drag.dropContainer.element.nativeElement;
            /** @type {?} */
            const dropElement = drop.element.nativeElement;
            /** @type {?} */
            const dragIndex = Array.from(dropElement.parentElement.children).indexOf(this.source ? phElement : sourceElement);
            /** @type {?} */
            const dropIndex = Array.from(dropElement.parentElement.children).indexOf(dropElement);
            if (!this.source) {
                this.sourceIndex = dragIndex;
                this.source = drag.dropContainer;
                phElement.style.width = sourceElement.clientWidth + 'px';
                phElement.style.height = sourceElement.clientHeight + 'px';
                sourceElement.parentElement.removeChild(sourceElement);
            }
            this.targetIndex = dropIndex;
            this.target = drop;
            phElement.style.display = '';
            dropElement.parentElement.insertBefore(phElement, (dropIndex > dragIndex
                ? dropElement.nextSibling : dropElement));
            this.placeholder.enter(drag, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
            return false;
            // tslint:disable-next-line:semicolon
        });
        this.target = null;
        this.source = null;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    static __isTouchEvent(event) {
        return event.type.startsWith('touch');
    }
    /**
     * @private
     * @param {?} dropList
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    static __isInsideDropListClientRect(dropList, x, y) {
        const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
        return y >= top && y <= bottom && x >= left && x <= right;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.renderItems();
        /** @type {?} */
        const phElement = this.placeholder.element.nativeElement;
        phElement.style.display = 'none';
        phElement.parentElement.removeChild(phElement);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.items) {
            if (!this.contentOutlet) {
                return;
            }
            this.renderItems();
        }
    }
    /**
     * @return {?}
     */
    renderItems() {
        this.changeDetector.detectChanges();
        this.contentOutlet.toArray().forEach((/**
         * @param {?} outlet
         * @param {?} index
         * @return {?}
         */
        (outlet, index) => {
            outlet.viewContainer.clear();
            outlet.viewContainer.createEmbeddedView(this.dragAndDropListData.first.template, {
                $implicit: this.items[index],
                index
            });
        }));
        this.changeDetector.detectChanges();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    dragMoved(e) {
        /** @type {?} */
        const point = this.getPointerPositionOnPage(e.event);
        this.listGroup._items.forEach((/**
         * @param {?} dropList
         * @return {?}
         */
        dropList => {
            if (SamDragAndDropGridComponent.__isInsideDropListClientRect(dropList, point.x, point.y)) {
                this.activeContainer = dropList;
                return;
            }
        }));
    }
    /**
     * @return {?}
     */
    drop() {
        if (!this.target) {
            return;
        }
        /** @type {?} */
        const phElement = this.placeholder.element.nativeElement;
        /** @type {?} */
        const parent = phElement.parentElement;
        phElement.style.display = 'none';
        parent.removeChild(phElement);
        parent.appendChild(phElement);
        parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);
        this.target = null;
        this.source = null;
        if (this.sourceIndex !== this.targetIndex) {
            moveItemInArray(this.items, this.sourceIndex, this.targetIndex);
            this.renderItems();
        }
    }
    /**
     * Determines the point of the page that was touched by the user.
     * @param {?} event
     * @return {?}
     */
    getPointerPositionOnPage(event) {
        // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
        /** @type {?} */
        const point = SamDragAndDropGridComponent.__isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
        /** @type {?} */
        const scrollPosition = this.viewportRuler.getViewportScrollPosition();
        return {
            x: point.pageX - scrollPosition.left,
            y: point.pageY - scrollPosition.top
        };
    }
}
SamDragAndDropGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'sam-drag-and-drop-grid',
                template: "<div cdkDropListGroup class=\"sam-drag-and-drop-grid\">\r\n  <div cdkDropList #placeholder [cdkDropListEnterPredicate]=\"enter\" (cdkDropListDropped)=\"drop()\"\r\n       [ngStyle]=\"{'max-width': 100/columnNumber + '%'}\">\r\n  </div>\r\n  <div cdkDropList *ngFor=\"let item of items\" class=\"sam-drop-list-item\"\r\n       [ngStyle]=\"{'max-width': 100/columnNumber + '%'}\"\r\n       [cdkDropListEnterPredicate]=\"enter\" (cdkDropListDropped)=\"drop()\">\r\n    <div cdkDrag (cdkDragMoved)=\"dragMoved($event)\" class=\"sam-drag-container\">\r\n      <ng-container samContentOutlet></ng-container>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                styles: [".sam-drag-and-drop-grid{display:-webkit-box;display:flex;flex-wrap:wrap;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.sam-drag-and-drop-grid .sam-drop-list-item{-webkit-box-flex:1;flex:1 1 100%;cursor:move}.sam-drag-and-drop-grid .sam-drop-list-item .sam-drag-container{height:100%}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:.3}.cdk-drag-animating{-webkit-transition:-webkit-transform 250ms cubic-bezier(0,0,.2,1);transition:transform 250ms cubic-bezier(0,0,.2,1);transition:transform 250ms cubic-bezier(0,0,.2,1),-webkit-transform 250ms cubic-bezier(0,0,.2,1)}"]
            }] }
];
/** @nocollapse */
SamDragAndDropGridComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ViewportRuler }
];
SamDragAndDropGridComponent.propDecorators = {
    items: [{ type: Input }],
    columnNumber: [{ type: Input }],
    contentOutlet: [{ type: ViewChildren, args: [SamDragAndDropListContentOutletDirective,] }],
    dragAndDropListData: [{ type: ContentChildren, args: [SamDragAndDropListDataDirective,] }],
    listGroup: [{ type: ViewChild, args: [CdkDropListGroup, { static: true },] }],
    placeholder: [{ type: ViewChild, args: [CdkDropList, { static: true },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SamDragAndDropGridModule {
}
SamDragAndDropGridModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SamDragAndDropGridComponent,
                    SamDragAndDropListContentOutletDirective,
                    SamDragAndDropListDataDirective
                ],
                imports: [
                    CommonModule,
                    DragDropModule
                ],
                exports: [
                    SamDragAndDropGridComponent,
                    SamDragAndDropListContentOutletDirective,
                    SamDragAndDropListDataDirective
                ]
            },] }
];

export { SamDragAndDropGridComponent, SamDragAndDropGridModule, SamDragAndDropListContentOutletDirective, SamDragAndDropListDataDirective };
//# sourceMappingURL=sam-1994-ngx-drag-and-drop-grid.js.map
