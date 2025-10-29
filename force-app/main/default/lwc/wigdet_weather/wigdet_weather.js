import { LightningElement } from 'lwc';

export default class Wigdet_weather extends LightningElement {
    destination = 'Lucknow'
    source = 'Pune'

    constructor(){
        super();
        console.log('script called');
    }

    connectedCallback(){
        this.getWeather()    
    }

    async getWeather(){
        try{
            const images_urls = [];
            for(let i = 0; i < 3; i++){
                const res = await fetch(`https://www.wttr.in/${this.destination}.png?${i}pq&transparency=255&background=112233`);
                const image_data = await res.blob();
                const url = URL.createObjectURL(image_data);
                images_urls.push(url);
            }
            [this.refs.img1,this.refs.img2 ,this.refs.img3 ].forEach((img, index) => {
                img.src = images_urls[index];
            })
        }catch(error){
            console.log(error);
        }
    }
}