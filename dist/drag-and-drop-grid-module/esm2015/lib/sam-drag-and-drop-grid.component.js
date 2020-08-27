/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ContentChildren, Directive, Input, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
export class SamDragAndDropListDataDirective {
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
if (false) {
    /** @type {?} */
    SamDragAndDropListDataDirective.prototype.template;
}
export class SamDragAndDropListContentOutletDirective {
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
if (false) {
    /** @type {?} */
    SamDragAndDropListContentOutletDirective.prototype.viewContainer;
}
export class SamDragAndDropGridComponent {
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
if (false) {
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.items;
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.columnNumber;
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.contentOutlet;
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.dragAndDropListData;
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.listGroup;
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.placeholder;
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.target;
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.targetIndex;
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.source;
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.sourceIndex;
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.activeContainer;
    /** @type {?} */
    SamDragAndDropGridComponent.prototype.enter;
    /**
     * @type {?}
     * @private
     */
    SamDragAndDropGridComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @private
     */
    SamDragAndDropGridComponent.prototype.viewportRuler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtLWRyYWctYW5kLWRyb3AtZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2FtLTE5OTQvbmd4LWRyYWctYW5kLWRyb3AtZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9zYW0tZHJhZy1hbmQtZHJvcC1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxLQUFLLEVBRUwsU0FBUyxFQUVULFdBQVcsRUFDWCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFLbkQsTUFBTSxPQUFPLCtCQUErQjs7OztJQUMxQyxZQUFtQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUM3QyxDQUFDOzs7WUFMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjthQUNyQzs7OztZQVZDLFdBQVc7Ozs7SUFZQyxtREFBaUM7O0FBSy9DLE1BQU0sT0FBTyx3Q0FBd0M7Ozs7SUFDbkQsWUFBbUIsYUFBK0I7UUFBL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO0lBQ2xELENBQUM7OztZQUhGLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxvQkFBb0IsRUFBQzs7OztZQWJ6QyxnQkFBZ0I7Ozs7SUFlSixpRUFBc0M7O0FBU3BELE1BQU0sT0FBTywyQkFBMkI7Ozs7O0lBMEJ0QyxZQUFvQixjQUFpQyxFQUFVLGFBQTRCO1FBQXZFLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBdkIzRSxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQXdFMUIs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QUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSzs7Y0FDakgsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLEVBQUU7UUFFckUsT0FBTztZQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxJQUFJO1lBQ3BDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxHQUFHO1NBQ3BDLENBQUM7SUFDSixDQUFDOzs7WUF2SkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLDZvQkFBc0Q7O2FBRXZEOzs7O1lBbENDLGlCQUFpQjtZQWNYLGFBQWE7OztvQkF1QmxCLEtBQUs7MkJBQ0wsS0FBSzs0QkFFTCxZQUFZLFNBQUMsd0NBQXdDO2tDQUNyRCxlQUFlLFNBQUMsK0JBQStCO3dCQUUvQyxTQUFTLFNBQUMsZ0JBQWdCLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDOzBCQUMxQyxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzs7OztJQVB0Qyw0Q0FBa0M7O0lBQ2xDLG1EQUFpQzs7SUFFakMsb0RBQTJIOztJQUMzSCwwREFBa0g7O0lBRWxILGdEQUFzRjs7SUFDdEYsa0RBQWlFOztJQUVqRSw2Q0FBMkI7O0lBQzNCLGtEQUEyQjs7SUFDM0IsNkNBQTJCOztJQUMzQixrREFBMkI7O0lBQzNCLHNEQUF1Qjs7SUE0RHZCLDRDQW9DRTs7Ozs7SUFyRlUscURBQXlDOzs7OztJQUFFLG9EQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDaGlsZHJlbixcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q2RrRHJhZywgQ2RrRHJhZ01vdmUsIENka0Ryb3BMaXN0LCBDZGtEcm9wTGlzdEdyb3VwLCBtb3ZlSXRlbUluQXJyYXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xyXG5pbXBvcnQge1ZpZXdwb3J0UnVsZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3NhbURyYWdBbmREcm9wTGlzdERhdGFdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2FtRHJhZ0FuZERyb3BMaXN0RGF0YURpcmVjdGl2ZSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XHJcbiAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tzYW1Db250ZW50T3V0bGV0XSd9KVxyXG5leHBvcnQgY2xhc3MgU2FtRHJhZ0FuZERyb3BMaXN0Q29udGVudE91dGxldERpcmVjdGl2ZSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2FtLWRyYWctYW5kLWRyb3AtZ3JpZCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NhbS1kcmFnLWFuZC1kcm9wLWdyaWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NhbS1kcmFnLWFuZC1kcm9wLWdyaWQuY29tcG9uZW50LnNhc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2FtRHJhZ0FuZERyb3BHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIGl0ZW1zOiBBcnJheTxhbnk+O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBjb2x1bW5OdW1iZXIgPSAxO1xyXG5cclxuICBAVmlld0NoaWxkcmVuKFNhbURyYWdBbmREcm9wTGlzdENvbnRlbnRPdXRsZXREaXJlY3RpdmUpIGNvbnRlbnRPdXRsZXQ6IFF1ZXJ5TGlzdDxTYW1EcmFnQW5kRHJvcExpc3RDb250ZW50T3V0bGV0RGlyZWN0aXZlPjtcclxuICBAQ29udGVudENoaWxkcmVuKFNhbURyYWdBbmREcm9wTGlzdERhdGFEaXJlY3RpdmUpIGRyYWdBbmREcm9wTGlzdERhdGE6IFF1ZXJ5TGlzdDxTYW1EcmFnQW5kRHJvcExpc3REYXRhRGlyZWN0aXZlPjtcclxuXHJcbiAgQFZpZXdDaGlsZChDZGtEcm9wTGlzdEdyb3VwLCB7c3RhdGljOiB0cnVlfSkgbGlzdEdyb3VwOiBDZGtEcm9wTGlzdEdyb3VwPENka0Ryb3BMaXN0PjtcclxuICBAVmlld0NoaWxkKENka0Ryb3BMaXN0LCB7c3RhdGljOiB0cnVlfSkgcGxhY2Vob2xkZXI6IENka0Ryb3BMaXN0O1xyXG5cclxuICBwdWJsaWMgdGFyZ2V0OiBDZGtEcm9wTGlzdDtcclxuICBwdWJsaWMgdGFyZ2V0SW5kZXg6IG51bWJlcjtcclxuICBwdWJsaWMgc291cmNlOiBDZGtEcm9wTGlzdDtcclxuICBwdWJsaWMgc291cmNlSW5kZXg6IG51bWJlcjtcclxuICBwdWJsaWMgYWN0aXZlQ29udGFpbmVyO1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyBfX2lzVG91Y2hFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiBldmVudCBpcyBUb3VjaEV2ZW50IHtcclxuICAgIHJldHVybiBldmVudC50eXBlLnN0YXJ0c1dpdGgoJ3RvdWNoJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBfX2lzSW5zaWRlRHJvcExpc3RDbGllbnRSZWN0KGRyb3BMaXN0OiBDZGtEcm9wTGlzdCwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHt0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHR9ID0gZHJvcExpc3QuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgcmV0dXJuIHkgPj0gdG9wICYmIHkgPD0gYm90dG9tICYmIHggPj0gbGVmdCAmJiB4IDw9IHJpZ2h0O1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcikge1xyXG4gICAgdGhpcy50YXJnZXQgPSBudWxsO1xyXG4gICAgdGhpcy5zb3VyY2UgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5yZW5kZXJJdGVtcygpO1xyXG5cclxuICAgIGNvbnN0IHBoRWxlbWVudCA9IHRoaXMucGxhY2Vob2xkZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIHBoRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgcGhFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQocGhFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLml0ZW1zKSB7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuY29udGVudE91dGxldCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnJlbmRlckl0ZW1zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICB0aGlzLmNvbnRlbnRPdXRsZXQudG9BcnJheSgpLmZvckVhY2goKG91dGxldDogU2FtRHJhZ0FuZERyb3BMaXN0Q29udGVudE91dGxldERpcmVjdGl2ZSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICBvdXRsZXQudmlld0NvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgICBvdXRsZXQudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcoXHJcbiAgICAgICAgdGhpcy5kcmFnQW5kRHJvcExpc3REYXRhLmZpcnN0LnRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAkaW1wbGljaXQ6IHRoaXMuaXRlbXNbaW5kZXhdLFxyXG4gICAgICAgICAgaW5kZXhcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBkcmFnTW92ZWQoZTogQ2RrRHJhZ01vdmUpIHtcclxuICAgIGNvbnN0IHBvaW50ID0gdGhpcy5nZXRQb2ludGVyUG9zaXRpb25PblBhZ2UoZS5ldmVudCk7XHJcblxyXG4gICAgdGhpcy5saXN0R3JvdXAuX2l0ZW1zLmZvckVhY2goZHJvcExpc3QgPT4ge1xyXG4gICAgICBpZiAoU2FtRHJhZ0FuZERyb3BHcmlkQ29tcG9uZW50Ll9faXNJbnNpZGVEcm9wTGlzdENsaWVudFJlY3QoZHJvcExpc3QsIHBvaW50LngsIHBvaW50LnkpKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVDb250YWluZXIgPSBkcm9wTGlzdDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGVudGVyID0gKGRyYWc6IENka0RyYWcsIGRyb3A6IENka0Ryb3BMaXN0KSA9PiB7XHJcbiAgICBpZiAoZHJvcCA9PT0gdGhpcy5wbGFjZWhvbGRlcikge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZHJvcCAhPT0gdGhpcy5hY3RpdmVDb250YWluZXIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBoRWxlbWVudCA9IHRoaXMucGxhY2Vob2xkZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRyYWcuZHJvcENvbnRhaW5lci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBkcm9wRWxlbWVudCA9IGRyb3AuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IGRyYWdJbmRleCA9IEFycmF5LmZyb20oZHJvcEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlbikuaW5kZXhPZih0aGlzLnNvdXJjZSA/IHBoRWxlbWVudCA6IHNvdXJjZUVsZW1lbnQpO1xyXG4gICAgY29uc3QgZHJvcEluZGV4ID0gQXJyYXkuZnJvbShkcm9wRWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKS5pbmRleE9mKGRyb3BFbGVtZW50KTtcclxuXHJcbiAgICBpZiAoIXRoaXMuc291cmNlKSB7XHJcbiAgICAgIHRoaXMuc291cmNlSW5kZXggPSBkcmFnSW5kZXg7XHJcbiAgICAgIHRoaXMuc291cmNlID0gZHJhZy5kcm9wQ29udGFpbmVyO1xyXG5cclxuICAgICAgcGhFbGVtZW50LnN0eWxlLndpZHRoID0gc291cmNlRWxlbWVudC5jbGllbnRXaWR0aCArICdweCc7XHJcbiAgICAgIHBoRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBzb3VyY2VFbGVtZW50LmNsaWVudEhlaWdodCArICdweCc7XHJcblxyXG4gICAgICBzb3VyY2VFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoc291cmNlRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50YXJnZXRJbmRleCA9IGRyb3BJbmRleDtcclxuICAgIHRoaXMudGFyZ2V0ID0gZHJvcDtcclxuXHJcbiAgICBwaEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgZHJvcEVsZW1lbnQucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUocGhFbGVtZW50LCAoZHJvcEluZGV4ID4gZHJhZ0luZGV4XHJcbiAgICAgID8gZHJvcEVsZW1lbnQubmV4dFNpYmxpbmcgOiBkcm9wRWxlbWVudCkpO1xyXG5cclxuICAgIHRoaXMucGxhY2Vob2xkZXIuZW50ZXIoZHJhZywgZHJhZy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCwgZHJhZy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzZW1pY29sb25cclxuICB9O1xyXG5cclxuICBkcm9wKCkge1xyXG4gICAgaWYgKCF0aGlzLnRhcmdldCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGhFbGVtZW50ID0gdGhpcy5wbGFjZWhvbGRlci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBwYXJlbnQgPSBwaEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuXHJcbiAgICBwaEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGhFbGVtZW50KTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChwaEVsZW1lbnQpO1xyXG4gICAgcGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLnNvdXJjZS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHBhcmVudC5jaGlsZHJlblt0aGlzLnNvdXJjZUluZGV4XSk7XHJcblxyXG4gICAgdGhpcy50YXJnZXQgPSBudWxsO1xyXG4gICAgdGhpcy5zb3VyY2UgPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLnNvdXJjZUluZGV4ICE9PSB0aGlzLnRhcmdldEluZGV4KSB7XHJcbiAgICAgIG1vdmVJdGVtSW5BcnJheSh0aGlzLml0ZW1zLCB0aGlzLnNvdXJjZUluZGV4LCB0aGlzLnRhcmdldEluZGV4KTtcclxuICAgICAgdGhpcy5yZW5kZXJJdGVtcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIERldGVybWluZXMgdGhlIHBvaW50IG9mIHRoZSBwYWdlIHRoYXQgd2FzIHRvdWNoZWQgYnkgdGhlIHVzZXIuICovXHJcbiAgZ2V0UG9pbnRlclBvc2l0aW9uT25QYWdlKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xyXG4gICAgLy8gYHRvdWNoZXNgIHdpbGwgYmUgZW1wdHkgZm9yIHN0YXJ0L2VuZCBldmVudHMgc28gd2UgaGF2ZSB0byBmYWxsIGJhY2sgdG8gYGNoYW5nZWRUb3VjaGVzYC5cclxuICAgIGNvbnN0IHBvaW50ID0gU2FtRHJhZ0FuZERyb3BHcmlkQ29tcG9uZW50Ll9faXNUb3VjaEV2ZW50KGV2ZW50KSA/IChldmVudC50b3VjaGVzWzBdIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdKSA6IGV2ZW50O1xyXG4gICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB0aGlzLnZpZXdwb3J0UnVsZXIuZ2V0Vmlld3BvcnRTY3JvbGxQb3NpdGlvbigpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHBvaW50LnBhZ2VYIC0gc2Nyb2xsUG9zaXRpb24ubGVmdCxcclxuICAgICAgeTogcG9pbnQucGFnZVkgLSBzY3JvbGxQb3NpdGlvbi50b3BcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==