import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Save } from '../shared/functionality/save';
import { Utils } from '../shared/functionality/utils';
import { DialogOption } from '../shared/models/dialog-option';
import { GridDialogConfig } from '../shared/models/grid-dialog-config';
import { GridDialogRow } from '../shared/models/grid-dialog-row';
import { NPC } from '../shared/models/npc';
import { SaveSlot } from '../shared/models/save-slot';
import { SelectionDialogConfig } from '../shared/models/selection-dialog-config';
import { TextConfig } from '../shared/models/text-config';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {
  private save: SaveSlot;
  public backgroundImage: string;
  public menuConfig: GridDialogConfig = new GridDialogConfig();
  public moneyConfig: TextConfig = new TextConfig(false, true, true, 0, false);
  public money: string;
  public place: string = '';
  public talkConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public talkTextConfig: TextConfig = new TextConfig(true, false, false, 0, true);
  public conversationText: string = '';
  private npcs: NPC[] = [];
  private npcSelected: NPC | undefined = undefined;
  private npcTextIndex: number = 0;
  public dialogsReset: any;
  public dialogsVisible: any;
  public overlay: boolean = false;

  constructor(
    private element: ElementRef,
    private translate: TranslateService,
    private router: Router
  ) {
    this.save = Save.save;
    if (!this.save) {
      this.router.navigateByUrl('menu');
    }
    this.save.location.music.on('end', () => {this.save.location.music.play('repeat'); this.save.location.music.off('end')});
    this.save.location.music.play('start');
    this.backgroundImage = this.save.location.name.split('.')[2];
    this.translate.get(['location.menu.talkTo.name', 'location.menu.goods.name', 'location.menu.psi.name', 'location.menu.equip.name', 'location.menu.check.name', 'location.menu.status.name']).subscribe(translations => {
      const options: DialogOption[] = [
        new DialogOption('talkTo', translations['location.menu.talkTo.name']),
        new DialogOption('goods', translations['location.menu.goods.name']),
      ];
      const options2: DialogOption[] = [
        new DialogOption('psi', translations['location.menu.psi.name']),
        new DialogOption('equip', translations['location.menu.equip.name']),
      ];
      const options3: DialogOption[] = [
        new DialogOption('check', translations['location.menu.check.name']),
        new DialogOption('status', translations['location.menu.status.name']),
      ];
      this.menuConfig.rows = [new GridDialogRow(options), new GridDialogRow(options2), new GridDialogRow(options3)];
    });
    this.money = `$${this.save.money.toString()}&`;
    this.translate.get(this.save.location.name).subscribe(translation => {
      this.place = translation;
    });
    this.save.location.npcs.forEach(npc => {
      this.translate.get(['location.menu.talkTo.title', npc.name, npc.texts]).subscribe(translations => {
        this.talkConfig.text = translations['location.menu.talkTo.title'];
        this.talkConfig.options.push(new DialogOption(translations[npc.name], translations[npc.name]));
        this.npcs.push(new NPC(translations[npc.name], translations[npc.texts]));
      });
    });
    this.dialogsReset = {
      menu: false
    };
    this.dialogsVisible = {
      talk: false,
      conversation: false
    }
  }

  ngOnInit(): void {
    this.calculateSizes();
  }

  ngOnDestroy(): void {
    this.save.location.music.stop();
  }

  @HostListener('window:resize') calculateSizes() {
    Utils.calculateBackgroundSize(this.element, '.location');
    Utils.calculateTextSize();
  }

  manageMenuSelected(option: DialogOption) {
    this.menuConfig.focus = false;
    this.dialogsReset.menu = false;
    switch (option.value) {
      case 'talkTo':
        this.talkMenu();
        break;
      case 'goods':

        break;
      case 'psi':

        break;
      case 'equip':

        break;
      case 'check':

        break;
      case 'status':

    }
  }

  talkMenu() {
    this.talkConfig.focus = true;
    this.dialogsVisible.talk = true;
  }

  manageTalkSelected(option: DialogOption) {
    this.talkConfig.focus = false;
    this.npcTextIndex = 0;
    this.npcSelected = this.npcs.find(npc => npc.name === option.value);
    this.dialogsVisible.conversation = true;
    this.manageConversationFinished();
  }

  cancelTalkSelection() {
    this.menuConfig.focus = true;
    this.dialogsReset.menu = true;
    this.dialogsVisible.talk = false;
  }

  manageConversationFinished() {
    if (this.npcSelected && this.npcTextIndex < this.npcSelected.texts.length) {
      this.conversationText = this.replaceConversationVariables(this.npcSelected.texts[this.npcTextIndex++]);
    }
    else {
      this.menuConfig.focus = true;
      this.dialogsReset.menu = true;
      this.dialogsVisible.talk = false;
      this.dialogsVisible.conversation = false;
    }
  }

  replaceConversationVariables(text: string): string {
    text = text.replace('{{protagonistName}}', this.save.characters[0].name);
    text = text.replace('{{favoriteFood}}', this.save.favoriteFood);
    return text;
  }
}
