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
 
import {Forum} from '../enums/enums';

export class Filter {

    public searchTerm: string;
    public filterByForum: string[];
    public sortBy: string;
    public filterByAnswer: string ;

    public constructor() {
        this.load();
    }

    public save() {
        this.saveSetting("searchTerm", this.searchTerm);
        this.saveSetting("sortBy", this.sortBy);
        this.saveSetting("filterByAnswer", this.filterByAnswer);
        this.saveSetting("filterByForum", this.filterByForum.join(","));
    }

    private saveSetting(key : string, value : string) {
        localStorage.setItem(key, value);
    }

    private loadSetting(key : string, defaultValue : string) : string {
        let value = localStorage.getItem(key);
        
        if (value === null) {
            return defaultValue
        } else {
            return value;
        }
    }
    
    public load() {
        this.searchTerm = this.loadSetting("searchTerm", "");
        this.sortBy = this.loadSetting("sortBy", "");
        this.filterByAnswer = this.loadSetting("filterByAnswer", "");
        
        if (this.loadSetting("filterByForum", "") === "") {
            this.filterByForum = [
                Forum.ChitChat,
                Forum.Editing,
                Forum.Developing,
                Forum.Jobs,
                Forum.Installation,
                Forum.International,
                Forum.Theme,
                Forum.BlockRequests,
                Forum.Marketplace,
                Forum.Legacy,
                Forum.Old
            ];
        } else {
            this.filterByForum = this.loadSetting("filterByForum", "").split(",");
        }
    }
}