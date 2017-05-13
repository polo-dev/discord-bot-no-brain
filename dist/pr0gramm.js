var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pr0 = require('pr0gramm-api');
require('dotenv').config();
const api = pr0.Pr0grammAPI.createWithCookies();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let loginResponse = yield api.user.login(process.env.Pr0_NAME, process.env.Pr0_PWD);
        if (!loginResponse.success) {
            console.log("Could not log in :(");
            if (loginResponse.ban !== null) {
                console.log("You are banned. Reason:");
                console.log(loginResponse.ban.reason);
                return;
            }
        }
    });
}
main();
module.exports = {
    getItems: function (tag) {
        return __awaiter(this, void 0, void 0, function* () {
            let mainItems = yield api.items.getItems({
                promoted: true,
                flags: pr0.ItemFlags.All,
                tags: [tag]
            });
            return mainItems;
        });
    },
    getImage: function (tag) {
        return __awaiter(this, void 0, void 0, function* () {
            let mainItems = yield this.getItems(tag);
            if (typeof mainItems.items === 'undefined' || mainItems.items.length === 0) {
                return "Soz, j'ai rien pour toi ;(";
            }
            let random, i = 0;
            do {
                random = Math.floor(Math.random() * mainItems.items.length);
                console.log(random);
                i++;
            } while (mainItems.items[random].image.substr(-3) === "mp4" || mainItems.items.length < i);
            //console.dir(mainItems.items[random]);
            console.log(mainItems.items[random].image);
            return 'http://vid.pr0gramm.com/' + mainItems.items[random].image;
        });
    },
    getVideo: function (tag) {
        return __awaiter(this, void 0, void 0, function* () {
            let mainItems = yield this.getItems(tag);
            let random;
            do {
                random = Math.floor(Math.random() * mainItems.items.length) + 1;
            } while (mainItems.items[random].image.substr(-3) == !"mp4");
            //console.dir(mainItems.items[random]);
            return 'http://vid.pr0gramm.com/' + mainItems.items[random].image;
        });
    },
    getVideoAndImage: function (tag) {
        return __awaiter(this, void 0, void 0, function* () {
            let mainItems = yield this.getItems(tag);
            if (typeof mainItems.items === 'undefined' || mainItems.items.length === 0) {
                return "Soz, j'ai rien pour toi ;(";
            }
            let random = Math.floor(Math.random() * mainItems.items.length) + 1;
            return 'http://vid.pr0gramm.com/' + mainItems.items[random].image;
        });
    },
    bar: function (req, res, next) {
        this.foo();
    }
};