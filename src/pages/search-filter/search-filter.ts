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

import {Component} from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {Forum} from '../../enums/enums';
import {Sort} from '../../enums/enums';
import {AnswerFilter} from '../../enums/enums';
import {SearchProvider} from '../../providers/search/search';

@Component({
    selector: 'page-search-filter',
    templateUrl: 'search-filter.html',
})
export class SearchFilterPage {

    public forums: any[] = [];
    public sortOrders: any[] = [];
    public answerFilters: any[] = [];

    constructor(public navCtrl: NavController, private events: Events, public navParams: NavParams, public searchProvider: SearchProvider) {
        this.prepareForumArray();
        this.prepareSortOrdersArray();
        this.prepareAnswerFiltersArray();
    }

    prepareAnswerFiltersArray() {
        this.answerFilters.push({
            value: AnswerFilter.ShowAll,
            label: "Show All"
        });
        
        this.answerFilters.push({
            value: AnswerFilter.Answered,
            label: "Answered Only"
        });
        
        this.answerFilters.push({
            value: AnswerFilter.Unanswered,
            label: "Unanswered Only"
        });
    }

    prepareForumArray() {
        this.forums.push({
            value: Forum.ChitChat,
            label: "Chit Chat"
        });

        this.forums.push({
            value: Forum.Editing,
            label: "Editing (v7+)"
        });

        this.forums.push({
            value: Forum.Developing,
            label: "Developing (v7+)"
        });

        this.forums.push({
            value: Forum.Jobs,
            label: "Jobs"
        });

        this.forums.push({
            value: Forum.Installation,
            label: "Installation Help"
        });

        this.forums.push({
            value: Forum.International,
            label: "Internationalization"
        });

        this.forums.push({
            value: Forum.Theme,
            label: "Themes"
        });

        this.forums.push({
            value: Forum.BlockRequests,
            label: "Block Requests"
        });

        this.forums.push({
            value: Forum.Marketplace,
            label: "Submit to Marketplace"
        });

        this.forums.push({
            value: Forum.Legacy,
            label: "Legacy (version 5.6.x-)"
        });

        this.forums.push({
            value: Forum.Old,
            label: "(OLD 5.7 Discussion)"
        });

    }

    prepareSortOrdersArray() {
        this.sortOrders.push({
            value: Sort.RecentActivity,
            label: "Recent Activity"
        });
        
        this.sortOrders.push({
            value: Sort.MostHelpful,
            label: "Most Helpful"
        });
        
        this.sortOrders.push({
            value: Sort.MostReplies,
            label: "Most Replies"
        });
    }

    save() {
        this.searchProvider.filter.save();
        this.events.publish("refreshResults");
        this.navCtrl.pop();
    }
}
