class Bottle extends PickableObject {
    
    // AUDIO_PICK = new Audio('./audio/blob.mp3');
    constructor(x,y){
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        // this.AUDIO_PICK.playbackRate = 1;
        this.width = 50;
        this.height = 60;
    }
}