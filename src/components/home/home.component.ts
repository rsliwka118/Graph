import { MediaMatcher } from '@angular/cdk/layout'
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { GraphService } from '../../services/graph.service'
import { DataService } from 'src/services/data.service'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { FilesBottomSheetComponent } from '../mat-components/files-bottom-sheet/files-bottom-sheet.component'
import { MatDialog } from '@angular/material/dialog'
import { SaveConfirmComponent } from '../mat-components/dialogs/save-confirm/save-confirm.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild('network') el: ElementRef
  mobileQuery: MediaQueryList

  isNavOpen = false
  isMatrixOpen = true
  isAlgOpen = true

  private _mobileQueryListener: () => void

  constructor(public dialog: MatDialog, public graphService: GraphService, public bottomSheet: MatBottomSheet, public dataService: DataService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)

    iconRegistry.addSvgIconLiteral('add-icon', sanitizer.bypassSecurityTrustHtml(ADD_ICON))
    iconRegistry.addSvgIconLiteral('add-icon-active', sanitizer.bypassSecurityTrustHtml(ADD_ICON_ACTIVE))
    iconRegistry.addSvgIconLiteral('files-icon', sanitizer.bypassSecurityTrustHtml(FILES_ICON))
    iconRegistry.addSvgIconLiteral('save-icon', sanitizer.bypassSecurityTrustHtml(SAVE_ICON))
    iconRegistry.addSvgIconLiteral('delete-icon', sanitizer.bypassSecurityTrustHtml(DELETE_ICON))
    iconRegistry.addSvgIconLiteral('delete-icon-active', sanitizer.bypassSecurityTrustHtml(DELETE_ICON_ACTIVE))
    iconRegistry.addSvgIconLiteral('new-icon', sanitizer.bypassSecurityTrustHtml(NEW_ICON));
    iconRegistry.addSvgIconLiteral('edge-icon', sanitizer.bypassSecurityTrustHtml(ADD_EDGE))
    iconRegistry.addSvgIconLiteral('edge-icon-active', sanitizer.bypassSecurityTrustHtml(ADD_EDGE_ACTIVE))
    iconRegistry.addSvgIconLiteral('edit-edge-icon', sanitizer.bypassSecurityTrustHtml(EDIT_EDGE))
    iconRegistry.addSvgIconLiteral('edit-edge-icon-active', sanitizer.bypassSecurityTrustHtml(EDIT_EDGE_ACTIVE))
    iconRegistry.addSvgIconLiteral('settings-icon', sanitizer.bypassSecurityTrustHtml(SETTINGS_ICON))
    iconRegistry.addSvgIconLiteral('matrix-icon', sanitizer.bypassSecurityTrustHtml(MATRIX_ICON))
    iconRegistry.addSvgIconLiteral('alg-icon', sanitizer.bypassSecurityTrustHtml(ALG_ICON))
    iconRegistry.addSvgIconLiteral('matrix-icon-active', sanitizer.bypassSecurityTrustHtml(MATRIX_ICON_ACTIVE))
    iconRegistry.addSvgIconLiteral('alg-icon-active', sanitizer.bypassSecurityTrustHtml(ALG_ICON_ACTIVE))
    iconRegistry.addSvgIconLiteral('graph-icon', sanitizer.bypassSecurityTrustHtml(GRAPH_ICON))
    iconRegistry.addSvgIconLiteral('arrow-icon', sanitizer.bypassSecurityTrustHtml(ARROW))
    iconRegistry.addSvgIconLiteral('play-icon', sanitizer.bypassSecurityTrustHtml(PLAY_ICON))
    iconRegistry.addSvgIconLiteral('pause-icon', sanitizer.bypassSecurityTrustHtml(PAUSE_ICON))
    iconRegistry.addSvgIconLiteral('stop-icon', sanitizer.bypassSecurityTrustHtml(STOP_ICON))
    iconRegistry.addSvgIconLiteral('replay-icon', sanitizer.bypassSecurityTrustHtml(REPLAY_ICON))

  }

  matrixToggle(): boolean {

    if(this.isNavOpen && this.isMatrixOpen) {

      this.isMatrixOpen = false

      return false

    } else {

      this.isMatrixOpen = false
      this.isAlgOpen = true

      return true
    }
    
  }

  algToggle(): boolean {

    if(this.isNavOpen && this.isAlgOpen) {

      this.isAlgOpen = false
      
      return false

    } else {

      this.isAlgOpen = false
      this.isMatrixOpen = true

      return true
    }

  }
  ngAfterViewInit() {
    let data = this.graphService.getGraph()
    this.graphService.buildGraph(this.el, data)
  }

  editNode(event: any) {
    let label = ""
    label += " " + event.target.value + " "

    this.graphService.editNodeLabel(label)
  }

  editEdge(event: any) {
    let label = event.target.value

    this.graphService.editEdgeWeight(label)
  }

  editAnimationSpeed(event: any) {
    this.graphService.animationSpeed = event.target.value

  }

  openSaveGraphConfirm() {
    this.dialog.open(SaveConfirmComponent, {data: { container: this.el }})
  }

  openFilesMenu() {
    this.bottomSheet.open(FilesBottomSheetComponent, {data: { container: this.el }, panelClass: 'custom-bottom-sheet'})
    this.dataService.getGraphList()
  }

  ngOnInit(): void {
    //localStorage.clear()
    this.dataService.getGraphList()
  }
  
}

const ADD_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#757a7e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`
const ADD_ICON_ACTIVE = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#ff4081"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`
const FILES_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#757a7e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`
const SAVE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#757a7e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/></svg>`
const DELETE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#757a7e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>`
const DELETE_ICON_ACTIVE = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#ff4081"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>`
const NEW_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#757a7e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 11h-2v3H8v2h3v3h2v-3h3v-2h-3zm1-9H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>`
const ADD_EDGE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><style>.cls-1 {fill: none;}.cls-2 {fill: #757a7e;}</style></defs><g id="AddEdge" transform="translate(-332 -316)"><path id="Path_1" data-name="Path 1" class="cls-1" d="M0,0H24V24H0Z" transform="translate(332 316)"/><path id="Path_2" data-name="Path 2" class="cls-2" d="M13,11H11V33.022h2V11Z" transform="translate(351.398 303.631) rotate(45)"/><circle id="Ellipse_1" data-name="Ellipse 1" class="cls-2" cx="2.5" cy="2.5" r="2.5" transform="translate(334 333)"/><circle id="Ellipse_2" data-name="Ellipse 2" class="cls-2" cx="2.5" cy="2.5" r="2.5" transform="translate(349 318)"/><path id="Path_3" data-name="Path 3" class="cls-2" d="M13,11H11v6.6h2V11Z" transform="translate(338.702 320.405)"/><path id="Path_4" data-name="Path 4" class="cls-2" d="M13,11H11v6.6h2V11Z" transform="translate(365 322.702) rotate(90)"/></g></svg>`
const ADD_EDGE_ACTIVE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><style>.cls-1 {fill: none;}.cls-2 {fill: #ff4081;}</style></defs><g id="AddEdgeActive" transform="translate(-332 -316)"><path id="Path_1" data-name="Path 1" class="cls-1" d="M0,0H24V24H0Z" transform="translate(332 316)"/><path id="Path_2" data-name="Path 2" class="cls-2" d="M13,11H11V33.022h2Z" transform="translate(351.398 303.631) rotate(45)"/><circle id="Ellipse_1" data-name="Ellipse 1" class="cls-2" cx="2.5" cy="2.5" r="2.5" transform="translate(334 333)"/><circle id="Ellipse_2" data-name="Ellipse 2" class="cls-2" cx="2.5" cy="2.5" r="2.5" transform="translate(349 318)"/><path id="Path_3" data-name="Path 3" class="cls-2" d="M13,11H11v6.6h2Z" transform="translate(338.702 320.405)"/><path id="Path_4" data-name="Path 4" class="cls-2" d="M13,11H11v6.6h2Z" transform="translate(365 322.702) rotate(90)"/></g></svg>`
const EDIT_EDGE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g id="EditEdge" transform="translate(-332 -316)"><path id="Path_1" data-name="Path 1" d="M0,0H24V24H0Z" transform="translate(332 316)" fill="none"/><path id="Path_2" data-name="Path 2" d="M13,11H11V33.022h2V11Z" transform="translate(351.398 303.631) rotate(45)" fill="#757a7e"/><circle id="Ellipse_1" data-name="Ellipse 1" cx="2.5" cy="2.5" r="2.5" transform="translate(334 333)" fill="#757a7e"/><circle id="Ellipse_2" data-name="Ellipse 2" cx="2.5" cy="2.5" r="2.5" transform="translate(349 318)" fill="#757a7e"/><path id="Path_3" data-name="Path 3" d="M13,11H11v6.6h2V11Z" transform="matrix(0.656, 0.755, -0.755, 0.656, 352.586, 315.819)" fill="#757a7e"/><path id="Path_4" data-name="Path 4" d="M12.937,12.442H11V11h1.937v1.442Z" transform="matrix(0.656, 0.755, -0.755, 0.656, 353.974, 314.64)" fill="#757a7e"/><path id="Path_5" data-name="Path 5" d="M11,11.735V11h2.024v.735l-1.13,1.06Z" transform="matrix(0.656, 0.755, -0.755, 0.656, 347.295, 320.437)" fill="#757a7e"/></g></svg>`
const EDIT_EDGE_ACTIVE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><style>.a{fill:none;}.b{fill:#ff4081;}</style></defs><g transform="translate(-332 -316)"><path class="a" d="M0,0H24V24H0Z" transform="translate(332 316)"/><path class="b" d="M13,11H11V33.022h2Z" transform="translate(351.398 303.631) rotate(45)"/><circle class="b" cx="2.5" cy="2.5" r="2.5" transform="translate(334 333)"/><circle class="b" cx="2.5" cy="2.5" r="2.5" transform="translate(349 318)"/><path class="b" d="M13,11H11v6.6h2Z" transform="matrix(0.656, 0.755, -0.755, 0.656, 352.586, 315.819)"/><path class="b" d="M12.937,12.442H11V11h1.937Z" transform="matrix(0.656, 0.755, -0.755, 0.656, 353.974, 314.64)"/><path class="b" d="M11,11.735V11h2.024v.735l-1.13,1.06Z" transform="matrix(0.656, 0.755, -0.755, 0.656, 347.295, 320.437)"/></g></svg>`
const SETTINGS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#757a7e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>`
const MATRIX_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#757a7e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/></svg>`
const MATRIX_ICON_ACTIVE = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff4081"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/></svg>`
const ALG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#757a7e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.66 4.52l2.83 2.83-2.83 2.83-2.83-2.83 2.83-2.83M9 5v4H5V5h4m10 10v4h-4v-4h4M9 15v4H5v-4h4m7.66-13.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65zM11 3H3v8h8V3zm10 10h-8v8h8v-8zm-10 0H3v8h8v-8z"/></svg>`
const ALG_ICON_ACTIVE = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#ff4081"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.66 4.52l2.83 2.83-2.83 2.83-2.83-2.83 2.83-2.83M9 5v4H5V5h4m10 10v4h-4v-4h4M9 15v4H5v-4h4m7.66-13.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65zM11 3H3v8h8V3zm10 10h-8v8h8v-8zm-10 0H3v8h8v-8z"/></svg>`
const ARROW = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#757a7e"><rect fill="none" height="24" width="24"/><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z"/></svg>`
const GRAPH_ICON = `<svg id="insights_black_48dp" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g id="Group_1" data-name="Group 1"><rect id="Rectangle_1" data-name="Rectangle 1" width="20" height="20" fill="none"/></g><g id="Group_3" data-name="Group 3" transform="translate(0 -1)"><g id="Group_2" data-name="Group 2"><path id="Path_3" data-name="Path 3" d="M16.5,6a1.494,1.494,0,0,0-1.35,2.14l-3.01,3.01a1.474,1.474,0,0,0-1.29,0L9.84,10.14A1.379,1.379,0,0,0,10,9.5a1.5,1.5,0,1,0-2.85.64L4.14,13.15a1.518,1.518,0,1,0,.71.71l3.01-3.01a1.474,1.474,0,0,0,1.29,0l1.01,1.01a1.379,1.379,0,0,0-.16.64,1.5,1.5,0,1,0,2.85-.64l3.01-3.01A1.5,1.5,0,1,0,16.5,6Z" fill="#757a7e"/></g></g></svg>`
const PLAY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#757a7e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/></svg>`
const PAUSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#757a7e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
const REPLAY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#757a7e"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><g/><path d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z"/></g></svg>`
const STOP_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#757a7e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 8v8H8V8h8m2-2H6v12h12V6z"/></svg>`