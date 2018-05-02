class Speaker {
    constructor() {
        this.ss = window.speechSynthesis;
    }

    say(message) {
        return new Promise(resolve => {
            const utt = new SpeechSynthesisUtterance(message);
            utt.onend = () => resolve();
            this.ss.speak(utt);
        });
    }
}

export default new Speaker();