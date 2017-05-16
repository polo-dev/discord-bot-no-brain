"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Furry = require("e621");
const e621 = new Furry();
module.exports = {
    getMessage: function (message) {
        var splitMessage = message.content.toLowerCase().split(" ");
        if (splitMessage[0] === '/furry') {
            this.getFurry(message, splitMessage[1]);
        }
    },
    getFurry: function (message, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            let image = yield e621.getFurry(200, tag, "furry"); //max 320
            let random = Math.floor(Math.random() * image.length) + 1;
            if (image[random]) {
                console.log("random e621 : " + random + " " + image[random]['file_url']);
                message.channel.send(image[random]['file_url']);
            }
            else {
                message.channel.send("Ben alors ? Y a plus de furry pour toi ? :( ");
            }
        });
    }
};
