import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { User } from '@core/interfaces/user';
import { Message } from '@core/interfaces/message';
import { InfoMessage } from '@core/interfaces/info-message';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { ChatService } from '../../services/chat.service';

interface EditMessage {
  id: number;
  index: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewChecked {

  @ViewChild('messageContainer') messageContainer: ElementRef;
  public user: User;
  public messages: InfoMessage[] = [];
  public text = new FormControl('');
  public editMessage = false;
  public editMsg: EditMessage = null;
  private scrollBottom = false;

  constructor(
    private chatService: ChatService,
    public dialog: MatDialog,
  ) { }

  private scrollBottomMessage(): void {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    if (this.scrollBottom) {
      this.scrollBottom = false;
      this.scrollBottomMessage();
    }
  }

  ngOnInit() {
    this.user = this.chatService.getUser();
    this.chatService.getAll()
    .subscribe(
      res => {
        res.subscribe(data => {
          this.messages.push(data);
          this.scrollBottom = true;
        });
      }
    );
  }

  private edit(editMessage: EditMessage) {
    this.chatService.editMessage(
      {id: editMessage.id, user_id: this.user.id, text: this.text.value, date: new Date()}
    ).subscribe(result => {
      this.messages[editMessage.index].text = this.text.value;
      this.onEditReset();
    });
  }

  private add(message: Message) {
    this.chatService.addMessage(message).subscribe(id => {
      this.messages.push({...message, user: this.user, id});
      this.text.reset();
      this.editMessage = false;
      this.scrollBottom = true;
    });
  }

  public onEdit(editMsg: EditMessage): void {
    this.scrollBottom = false;
    this.editMessage = true;
    this.editMsg = editMsg;
    this.text.setValue(this.messages[editMsg.index].text);
  }

  public onEditReset() {
    this.scrollBottom = false;
    this.editMessage = false;
    this.editMsg = null;
    this.text.reset();
  }

  public onDelete(deleteMsg: EditMessage): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {title: 'Удаление', text: 'Вы дейсьвительно хотите  удалить?'}
    });
    dialogRef.afterClosed().subscribe(isDelete => {
      if (isDelete) {
          this.scrollBottom = false;
          this.chatService.deleteMessage(deleteMsg.id);
          this.messages.splice(deleteMsg.index, 1);
      }
    });
  }

  public onSend(): void {
    if (!this.editMessage) {
      this.add({user_id: this.user.id, text: this.text.value, date: new Date()});
    } else {
      this.edit(this.editMsg);
    }
  }

}
