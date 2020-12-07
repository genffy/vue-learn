import {Random} from 'mockjs';
const data = [{
    children: Random.guid(),
}];
// 0-0-1 => null
// 0-0-0 => id: 131
// 1-0-0-2 => id: 2311
const template = [
    {
        "children": [
            {
                "children": [
                    {
                        "children": [
                            {
                                "children": null,
                                "label": "1兰兰(T3333)",
                                "value": "1313"
                            },
                            {
                                "children": null,
                                "label": "1兰兰(T3333)",
                                "value": "1312"
                            },
                            {
                                "children": null,
                                "label": "1兰兰(T3333)",
                                "value": "1311"
                            }
                        ],
                        "label": "1叶老师新人组",
                        "value": "131"
                    }
                ],
                "label": "1大区涵涵",
                "value": "13"
            },
            {
                "children": null,
                "label": "1兰兰(T3333)",
                "value": "12"
            },
            {
                "children": null,
                "label": "1兰兰(T3333)",
                "value": "11"
            }
        ],
        "label": "一对一",
        "value": "1"
    },
    {
        "children": [
            {
                "children": [
                    {
                        "children": [
                            {
                                "children": null,
                                "label": "2兰兰(T3333)",
                                "value": "2313"
                            },
                            {
                                "children": null,
                                "label": "2兰兰(T3333)",
                                "value": "2312"
                            },
                            {
                                "children": null,
                                "label": "2兰兰(T3333)",
                                "value": "2311"
                            }
                        ],
                        "label": "2叶老师新人组",
                        "value": "231"
                    }
                ],
                "label": "2大区涵涵",
                "value": "23"
            },
            {
                "children": null,
                "label": "2兰兰(T3333)",
                "value": "22"
            },
            {
                "children": [
                    {
                        "children": null,
                        "label": "2兰兰(T3333)",
                        "value": "211"
                    }
                ],
                "label": "2兰兰(T3333)",
                "value": "21"
            }
        ],
        "label": "2一对二",
        "value": "2"
    },
    {
        "children": [
            {
                "children": [
                    {
                        "children": [
                            {
                                "children": null,
                                "label": "3兰兰(T3333)",
                                "value": "3313"
                            },
                            {
                                "children": null,
                                "label": "3兰兰(T3333)",
                                "value": "3312"
                            },
                            {
                                "children": null,
                                "label": "3兰兰(T3333)",
                                "value": "3311"
                            }
                        ],
                        "label": "3叶老师新人组",
                        "value": "331"
                    },
                    {
                        "children": [
                            {
                                "children": null,
                                "label": "3兰兰(T3333)",
                                "value": "3323"
                            },
                            {
                                "children": null,
                                "label": "3兰兰(T3333)",
                                "value": "3322"
                            },
                            {
                                "children": null,
                                "label": "3兰兰(T3333)",
                                "value": "3321"
                            }
                        ],
                        "label": "322222叶老师新人组",
                        "value": "332"
                    }
                ],
                "label": "3大区涵涵",
                "value": "33"
            },
            {
                "children": null,
                "label": "3兰兰(T3333)",
                "value": "32"
            },
            {
                "children": [
                    {
                        "children": null,
                        "label": "3兰兰(T3333)",
                        "value": "321"
                    },
                    {
                        "children": null,
                        "label": "3兰兰(T3333)",
                        "value": "322"
                    }
                ],
                "label": "3兰兰(T3333)",
                "value": "31"
            }
        ],
        "label": "3一对二",
        "value": "3"
    },
];

data.concat(template);

export default template;