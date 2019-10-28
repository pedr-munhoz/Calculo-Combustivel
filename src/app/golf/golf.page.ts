import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-golf',
  templateUrl: './golf.page.html',
  styleUrls: ['./golf.page.scss'],
})
export class GolfPage implements OnInit {

  public kmRodados: number;
  public litrosGastos: number;
  public tanqueAtual: number;
  public consumoMedio: number;
  public consumoEsperado: number;
  public tamanhoTanque: number;

  public aux: number;
  

  public postos: Array<{nome: string; media: number; litrosGastos: number; kmRodados: number}> = [];
  public ultimo: {posto: string; km: number, litros: number};

  public abastecimento: {posto: string; km: number, litros: number, nivelTanque: number};

  constructor(public alertcontroller: AlertController) { 
    this.kmRodados = 0;
    this.litrosGastos = 0;
    this.tanqueAtual = 1;
    this.tamanhoTanque = 40;

    this.consumoEsperado = 12;
    this.consumoMedio = 0;

    this.ultimo = {posto: 'BR', km:0, litros: 40};
    
    this.abastecimento = {posto: '', km: null, litros: null, nivelTanque: null};
    this.postos.push({
      nome: 'BR',
      media: 0,
      litrosGastos: 0,
      kmRodados: 0
    });
    this.postos.push({
      nome: 'Shell',
      media: 0,
      litrosGastos: 0,
      kmRodados: 0
    });
    this.postos.push({
      nome: 'Ipiranga',
      media: 0,
      litrosGastos: 0,
      kmRodados: 0
    });
  }

  public abastecer(posto, kmR, nT, litros): void {
    this.kmRodados = kmR;
    this.litrosGastos += (this.tanqueAtual - nT) * this.tamanhoTanque;
    this.consumoMedio = this.kmRodados / this.litrosGastos;

    switch (this.ultimo.posto) {
      case 'BR':
        this.aux = 0;
        break;
        
        case 'Shell':
        this.aux = 1;
        break;
    
        case 'Ipiranga':
        this.aux = 2;
        break;

      default:
        break;
    }    
    this.postos[this.aux].kmRodados += kmR - this.ultimo.km;
    this.postos[this.aux].litrosGastos += (this.tanqueAtual - nT) * this.tamanhoTanque;
    this.postos[this.aux].media = this.postos[this.aux].kmRodados / this.postos[this.aux].litrosGastos;
    
    this.tanqueAtual = nT + (litros / this.tamanhoTanque);
    this.ultimo = {
      posto: posto, 
      km: kmR, 
      litros: litros
    };
  }

  async abasteceBr() {
    const alert = await this.alertcontroller.create({
      header: 'BR',
      inputs: [
        {
          name: 'km',
          type: 'number',
          placeholder: 'Kms Rodados'
        },
        {
          name: 'nT',
          type: 'number',
          placeholder: 'Nivel do Tanque'
        },
        {
          name: 'l',
          type: 'number',
          placeholder: 'Litros'
        }
      ],
      buttons: ['cancelar','ok']
    })

    await alert.present();
    let result = await alert.onDidDismiss();

    this.abastecer('BR', result.data.values.km, result.data.values.nT/100, result.data.values.l);
  }

  async abasteceShell() {
    const alert = await this.alertcontroller.create({
      header: 'Shell',
      inputs: [
        {
          name: 'km',
          type: 'number',
          placeholder: 'Kms Rodados'
        },
        {
          name: 'nT',
          type: 'number',
          placeholder: 'Nivel do Tanque'
        },
        {
          name: 'l',
          type: 'number',
          placeholder: 'Litros'
        }
      ],
      buttons: ['cancelar','ok']
    })

    await alert.present();
    let result = await alert.onDidDismiss();

    this.abastecer('Shell', result.data.values.km, result.data.values.nT/100, result.data.values.l);
  }

  async abasteceIpiranga() {
    const alert = await this.alertcontroller.create({
      header: 'Ipiranga',
      inputs: [
        {
          name: 'km',
          type: 'number',
          placeholder: 'Kms Rodados'
        },
        {
          name: 'nT',
          type: 'number',
          placeholder: 'Nivel do Tanque'
        },
        {
          name: 'l',
          type: 'number',
          placeholder: 'Litros'
        }
      ],
      buttons: ['cancelar','ok']
    })

    await alert.present();
    let result = await alert.onDidDismiss();

    this.abastecer('Ipiranga', result.data.values.km, result.data.values.nT/100, result.data.values.l);
  }

  ngOnInit() {
  }

}
