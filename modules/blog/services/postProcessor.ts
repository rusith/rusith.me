import { IPostAttributes } from "../models/IPostAttributes"
import _ from "lodash"
import { url } from "consts"
import {DateTime} from "luxon"

export function processAttributes(attributes: any): IPostAttributes {
    const tags = attributes.tags as string
    const path = "/blog" + attributes.path

    const dateCreated = DateTime.fromJSDate(attributes.dateCreated)

    return {
        ...attributes,
        tags:  tags.split(' ').map(a => a.trim()),
        dateCreated: attributes.dateCreated.toString(),
        dateCreatedFormatted: dateCreated.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY),
        dateModified: attributes.dateModified?.toString(),
        datePublished: attributes.datePublished?.toString(),
        fullUrl: new URL(path, url).href,
        path
    }
}

export function processContent(attr: IPostAttributes, content: string): string {
    const values = {
        "page_banner_full_path": attr.banner ? new URL(attr.banner, url).href : '',
        "base_url": url,
    }

    let result = content

    for (const key of Object.keys(values)) {
        result = result.split(`$$${key}`).join(values[key])
    }


    if (attr.math) {
        for(const key of Object.keys(attr.math)) {
            result = result.split(`$$math-${key}`).join(attr.math[key])
        }
    }

    return result
}

