import { Component, OnInit } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.page.html',
  styleUrls: ['./home-chat.page.scss'],
})
export class HomeChatPage implements OnInit {
  message = '';
  messages = [];
  currentUser = '';
  userInfo: any = { name: null, phone: null };

  constructor(
    private socket: Socket,
    private toastCtrl: ToastController,
    public storage: Storage) { }

  async ngOnInit() {
    this.storage.get('userInfo')
      .then(res => {
        console.log(this.userInfo = res);
        setTimeout(() => {
          this.startChat();
      }, 2000);
      })
      .catch(erro => {
        alert(erro);
      });


  }

  startChat() {

    this.socket.connect();
    this.socket.emit('authenticate', { token: localStorage.getItem('token') });
    const name = this.userInfo.name;
    const user = this.userInfo;
    console.log('log', this.userInfo);
    this.currentUser = name;

    this.socket.emit('set-name', name);
    this.socket.emit('set-user', user);


    this.socket.fromEvent('users-changed').subscribe(data => {
      const user = data.user;
      const user = data.user;
      if (data.event === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

    this.socket.fromEvent('message').subscribe(message => {
      // this.storage.set('chat-message', message).then(messages =>{
      //   this.
      // })
      this.messages.push(message);
    });
  }
  sendMessage() {
    this.socket.emit('send-message', { text: this.message });
    this.message = '';
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
