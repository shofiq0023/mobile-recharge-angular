import { Component, OnInit } from '@angular/core';
import { RechargeInfo } from './models/recharge.model';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  bluetooth = false;
  bluetoothConnected = false;

  screenshotTimeDisplay = new Date().toString();
  batteryPercentage = 61;

  faBatteryHalf = "fa-battery-half";
  faBatteryThreeQuarter = "fa-battery-three-quarters";
  faBatteryQuarter = "fa-battery-quarter";

  batterySizeDisplay = this.faBatteryThreeQuarter;

  rechargeAmount = 1;
  mobileNumberPrefix = "+88";
  mobileNumber = "01618638686";
  mobileNumberDisplay = this.mobileNumberPrefix + this.mobileNumber;

  rechargeInfo: RechargeInfo[] = [];

  ngOnInit(): void {
    this.updateRechargeCount();
  }

  public changeBatteryPercentage() {
    if (this.batteryPercentage <= 30) {
      this.batterySizeDisplay = this.faBatteryQuarter;
    } else if (this.batteryPercentage > 30 && this.batteryPercentage < 65) {
      this.batterySizeDisplay = this.faBatteryHalf;
    } else {
      this.batterySizeDisplay = this.faBatteryThreeQuarter;
    }
  }

  public changeMobileNumber() {
    this.mobileNumberDisplay = this.mobileNumberPrefix + this.mobileNumber;
  }

  public updateRechargeCount() {
    let rechargeCount: RechargeInfo[] = [];
    for (let i = 0; i < this.rechargeAmount; i++) {
      let newType: RechargeInfo = {
        date: new Date(),
        amount: 500.0,
        currency: ".0 BDT"
      }

      rechargeCount.push(newType);
    }

    this.rechargeInfo = rechargeCount;
  }

  public saveImage() {
    let node: any = document.getElementById("image-section");
    htmlToImage.toPng(node)
      .then((dataUrl) => {
        let link = document.createElement('a');
        link.download = 'mobile-bill.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(err => console.log("Oops, something went wrong!", err));
  }

  public updateBluetoothOption(option: number) {
    if (option == 0) {
      this.bluetooth = false;
      this.bluetoothConnected = false;
    } else if (option == 1) {
      this.bluetooth = true;
      this.bluetoothConnected = false;
    } else if (option == 2) {
      this.bluetooth = false;
      this.bluetoothConnected = true;
    }
    
    console.log(this.bluetooth);
    console.log(this.bluetoothConnected);
  }

  public updateBluetoothConnectedOption() {
    this.bluetoothConnected != this.bluetoothConnected;
    console.log(this.bluetoothConnected);
  }
}
