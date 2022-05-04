class ThingList {
    constructor() {
        this.things=[];
    }
}

class Thing {
    constructor() {
        this.services=[];
        this.relationships=[];
        this.thingIp;
        this.lastSeen;
        this.thingId;
    }
}

class Services {
    constructor() {
        this.name;
        this.thingId;
        this.entityId;
        this.API;
        this.keywords;
    }
}

class Relationships {
    constructor() {
        this.thingId;
        this.name;
        this.category;
        this.type;
        this.serviceA;
        this.serviceB;

    }
}

class ThingListeningRunner {
    constructor() {
        this.oneTime=false;
        this.runner=true;
        this.Id;
    }
}

module.exports = {ThingList, Thing, Services, Relationships, ThingListeningRunner};