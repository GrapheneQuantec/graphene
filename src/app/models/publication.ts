export interface Indexed {
    "date-parts": number[][];
    "date-time": Date;
    "timestamp": number;
}

export interface Start {
    "date-parts": number[][];
    "date-time": Date;
    "timestamp": number;
}

export interface License {
    "URL": string;
    "start": Start;
    "delay-in-days": number;
    "content-version": string;
}

export interface Funder {
    "DOI": string;
    "name": string;
    "doi-asserted-by": string;
    "award": string[];
}

export interface ContentDomain {
    "domain": string[];
    "crossmark-restriction": boolean;
}

export interface PublishedPrint {
    "date-parts": number[][];
}

export interface Created {
    "date-parts": number[][];
    "date-time": Date;
    "timestamp": number;
}

export interface Author {
    "given": string;
    "family": string;
    "sequence": string;
    "affiliation": any[];
    "ORCID": string;
    "authenticated-orcid?": boolean;
}

export interface Link {
    "URL": string;
    "content-type": string;
    "content-version": string;
    "intended-application": string;
}

export interface Deposited {
    "date-parts": number[][];
    "date-time": Date;
    "timestamp": number;
}

export interface Issued {
    "date-parts": number[][];
}

export interface Relation {
}

export interface IssnType {
    "value": string;
    "type": string;
}

export interface Assertion {
    "value": string;
    "name": string;
    "label": string;
}

export interface Message {
    "indexed": Indexed;
    "reference-count": number;
    "publisher": string;
    "license": License[];
    "funder": Funder[];
    "content-domain": ContentDomain;
    "short-container-title": string[];
    "published-print": PublishedPrint;
    "DOI": string;
    "type": string;
    "created": Created;
    "page": string;
    "update-policy": string;
    "source": string;
    "is-referenced-by-count": number;
    "title": string[];
    "prefix": string;
    "volume": string;
    "author": Author[];
    "member": string;
    "container-title": string[];
    "original-title": any[];
    "language": string;
    "link": Link[];
    "deposited": Deposited;
    "score": number;
    "subtitle": any[];
    "short-title": any[];
    "issued": Issued;
    "references-count": number;
    "alternative-id": string[];
    "URL": string;
    "relation": Relation;
    "ISSN": string[];
    "issn-type": IssnType[];
    "assertion": Assertion[];
}

export interface Publication {
    "status": string;
    "message-type": string;
    "message-version": string;
    "message": Message;
}


