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

export enum Sort {
    None = "",
    RecentActivity = "recent_posts",
    MostHelpful = "helpful",
    MostReplies = "most_active"
}

export enum AnswerFilter {
    ShowAll = "",
    Answered = "answered",
    Unanswered = "unanswered"
}

export enum Forum {
    ChitChat = "142",
    Editing = "208",
    Developing = "144",
    Jobs = "223811",
    Installation = "143",
    International = "1053",
    Theme = "12356",
    BlockRequests = "1070",
    Marketplace = "632333",
    Legacy = "878867",
    Old = "561563"
}

export enum AccountType {
    Owner = "owner",
    Builder = "builder"
}