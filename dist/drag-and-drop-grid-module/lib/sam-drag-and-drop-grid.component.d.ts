import { AfterViewInit, ChangeDetectorRef, OnChanges, QueryList, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { CdkDrag, CdkDragMove, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
export declare class SamDragAndDropListDataDirective {
    template: TemplateRef<any>;
    constructor(template: TemplateRef<any>);
}
export declare class SamDragAndDropListContentOutletDirective {
    viewContainer: ViewContainerRef;
    constructor(viewContainer: ViewContainerRef);
}
export declare class SamDragAndDropGridComponent implements AfterViewInit, OnChanges {
    private changeDetector;
    private viewportRuler;
    items: Array<any>;
    columnNumber: number;
    contentOutlet: QueryList<SamDragAndDropListContentOutletDirective>;
    dragAndDropListData: QueryList<SamDragAndDropListDataDirective>;
    listGroup: CdkDropListGroup<CdkDropList>;
    placeholder: CdkDropList;
    target: CdkDropList;
    targetIndex: number;
    source: CdkDropList;
    sourceIndex: number;
    activeContainer: any;
    private static __isTouchEvent;
    private static __isInsideDropListClientRect;
    constructor(changeDetector: ChangeDetectorRef, viewportRuler: ViewportRuler);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    renderItems(): void;
    dragMoved(e: CdkDragMove): void;
    enter: (drag: CdkDrag<any>, drop: CdkDropList<any>) => boolean;
    drop(): void;
    /** Determines the point of the page that was touched by the user. */
    getPointerPositionOnPage(event: MouseEvent | TouchEvent): {
        x: number;
        y: number;
    };
}
