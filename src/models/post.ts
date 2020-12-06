/**
 * Project:     c5 community
 *
 * @copyright 2018 Fabian Bitter
 * 
 * @author Adrian Tillmann Geist (a.t.geist@gmx.de)
 * @author Fabian Bitter (fabian@bitter.de)
 * 
 * @version 1.0.0
 */

import * as moment from 'moment';

export class Post {

    public title: string;
    public message: string;
    public username: string;
    public tags: string;
    public forum: string; //Enum Forums
    public timestamp: Date;
    public pictureURL: string;

    getTeaser() {
        var maxLength = 65;
        
        if (this.message.length > maxLength) {
            return this.message.substring(0, maxLength - 4) + " ...";
        } else {
            return this.message;
        }
    }

    getRelativeTimestamp() {
        return moment(this.timestamp).fromNow();
    }


}