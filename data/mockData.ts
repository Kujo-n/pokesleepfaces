export type SleepStyle = {
    id: string;
    name: string;
    rarity: number; // 1-4 stars
    excludeFromFields?: string[]; // ポケモンfieldsから除外するフィールド（省略時は全fields出現）
};

export type Pokemon = {
    id: string;
    dexNumber: number;
    name: string;
    type: string;
    sleepType: 'うとうと' | 'すやすや' | 'ぐっすり';
    fields: string[]; // 出現フィールド
    styles: SleepStyle[];
};

export const FIELD_NAMES = [
    "イベント限定",
    "ワカクサ本島",
    "シアンの砂浜",
    "トープ洞窟",
    "ウノハナ雪原",
    "ラピスラズリ湖畔",
    "ゴールド旧発電所",
    "アンバー渓谷",
    "ワカクサ本島EX"
];

export const MOCK_POKEMON: Pokemon[] = [
    {
        "id": "p1_フシギダネ",
        "dexNumber": 1,
        "name": "フシギダネ",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p1_フシギダネ-1",
                "name": "こうごうせい寝",
                "rarity": 1
            },
            {
                "id": "p1_フシギダネ-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p1_フシギダネ-3",
                "name": "ツルだし寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p1_フシギダネ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p2_フシギソウ",
        "dexNumber": 2,
        "name": "フシギソウ",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p2_フシギソウ-1",
                "name": "こうごうせい寝",
                "rarity": 1
            },
            {
                "id": "p2_フシギソウ-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p2_フシギソウ-3",
                "name": "ツルだし寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p2_フシギソウ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p3_フシギバナ",
        "dexNumber": 3,
        "name": "フシギバナ",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p3_フシギバナ-1",
                "name": "こうごうせい寝",
                "rarity": 1
            },
            {
                "id": "p3_フシギバナ-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p3_フシギバナ-3",
                "name": "ツルだし寝",
                "rarity": 3
            },
            {
                "id": "p3_フシギバナ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p4_ヒトカゲ",
        "dexNumber": 4,
        "name": "ヒトカゲ",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p4_ヒトカゲ-1",
                "name": "ぱちぱち寝",
                "rarity": 1
            },
            {
                "id": "p4_ヒトカゲ-2",
                "name": "おなかさすり寝",
                "rarity": 2
            },
            {
                "id": "p4_ヒトカゲ-3",
                "name": "おなかだし寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p4_ヒトカゲ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p5_リザード",
        "dexNumber": 5,
        "name": "リザード",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p5_リザード-1",
                "name": "うでまくら寝",
                "rarity": 1
            },
            {
                "id": "p5_リザード-2",
                "name": "すわり寝",
                "rarity": 2
            },
            {
                "id": "p5_リザード-3",
                "name": "ぐうたら寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p5_リザード-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p6_リザードン",
        "dexNumber": 6,
        "name": "リザードン",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p6_リザードン-1",
                "name": "はらばい寝",
                "rarity": 1
            },
            {
                "id": "p6_リザードン-2",
                "name": "うでぐみ寝",
                "rarity": 2
            },
            {
                "id": "p6_リザードン-3",
                "name": "おなかだし寝",
                "rarity": 3
            },
            {
                "id": "p6_リザードン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p7_ゼニガメ",
        "dexNumber": 7,
        "name": "ゼニガメ",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p7_ゼニガメ-1",
                "name": "からにこもる寝",
                "rarity": 1
            },
            {
                "id": "p7_ゼニガメ-2",
                "name": "こもらない寝",
                "rarity": 2
            },
            {
                "id": "p7_ゼニガメ-3",
                "name": "ひっくりかえり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p7_ゼニガメ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p8_カメール",
        "dexNumber": 8,
        "name": "カメール",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p8_カメール-1",
                "name": "からにこもる寝",
                "rarity": 1
            },
            {
                "id": "p8_カメール-2",
                "name": "こもらない寝",
                "rarity": 2
            },
            {
                "id": "p8_カメール-3",
                "name": "つっぷし寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p8_カメール-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p9_カメックス",
        "dexNumber": 9,
        "name": "カメックス",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p9_カメックス-1",
                "name": "からにこもる寝",
                "rarity": 1
            },
            {
                "id": "p9_カメックス-2",
                "name": "こもらない寝",
                "rarity": 2
            },
            {
                "id": "p9_カメックス-3",
                "name": "ひっくりかえり寝",
                "rarity": 3
            },
            {
                "id": "p9_カメックス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p10_キャタピー",
        "dexNumber": 10,
        "name": "キャタピー",
        "type": "むし",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p10_キャタピー-1",
                "name": "ぺったり寝",
                "rarity": 1
            },
            {
                "id": "p10_キャタピー-2",
                "name": "あたまおもい寝",
                "rarity": 2
            },
            {
                "id": "p10_キャタピー-3",
                "name": "いとをはく寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p10_キャタピー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p11_トランセル",
        "dexNumber": 11,
        "name": "トランセル",
        "type": "むし",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p11_トランセル-1",
                "name": "じっと寝",
                "rarity": 1
            },
            {
                "id": "p11_トランセル-2",
                "name": "ゆらゆら寝",
                "rarity": 2
            },
            {
                "id": "p11_トランセル-3",
                "name": "かたくなる寝",
                "rarity": 3
            },
            {
                "id": "p11_トランセル-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p12_バタフリー",
        "dexNumber": 12,
        "name": "バタフリー",
        "type": "むし",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p12_バタフリー-1",
                "name": "すわりふゆう寝",
                "rarity": 1
            },
            {
                "id": "p12_バタフリー-2",
                "name": "ふゆう寝",
                "rarity": 2
            },
            {
                "id": "p12_バタフリー-3",
                "name": "りんぷんだし寝",
                "rarity": 3
            },
            {
                "id": "p12_バタフリー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p19_コラッタ",
        "dexNumber": 19,
        "name": "コラッタ",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ウノハナ雪原"
        ],
        "styles": [
            {
                "id": "p19_コラッタ-1",
                "name": "かおかき寝",
                "rarity": 1
            },
            {
                "id": "p19_コラッタ-2",
                "name": "くびかしげ寝",
                "rarity": 2
            },
            {
                "id": "p19_コラッタ-3",
                "name": "まえばかじり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p19_コラッタ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p20_ラッタ",
        "dexNumber": 20,
        "name": "ラッタ",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ウノハナ雪原"
        ],
        "styles": [
            {
                "id": "p20_ラッタ-1",
                "name": "はぎしり寝",
                "rarity": 1
            },
            {
                "id": "p20_ラッタ-2",
                "name": "ぼうだち寝",
                "rarity": 2
            },
            {
                "id": "p20_ラッタ-3",
                "name": "まえばかじり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p20_ラッタ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p23_アーボ",
        "dexNumber": 23,
        "name": "アーボ",
        "type": "どく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p23_アーボ-1",
                "name": "とぐろ寝",
                "rarity": 1,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p23_アーボ-2",
                "name": "のびちぢみ寝",
                "rarity": 2,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p23_アーボ-3",
                "name": "ほぐれ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p23_アーボ-4",
                "name": "おなかのうえ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            }
        ]
    },
    {
        "id": "p24_アーボック",
        "dexNumber": 24,
        "name": "アーボック",
        "type": "どく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p24_アーボック-1",
                "name": "とぐろ寝",
                "rarity": 1,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p24_アーボック-2",
                "name": "かたむき寝",
                "rarity": 2,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p24_アーボック-3",
                "name": "ほぐれ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p24_アーボック-4",
                "name": "おなかのうえ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            }
        ]
    },
    {
        "id": "p25_ピカチュウ",
        "dexNumber": 25,
        "name": "ピカチュウ",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p25_ピカチュウ-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p25_ピカチュウ-2",
                "name": "たれみみ寝",
                "rarity": 2
            },
            {
                "id": "p25_ピカチュウ-3",
                "name": "ほうでん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p25_ピカチュウ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p25_ハロピカ",
        "dexNumber": 25,
        "name": "ハロピカ",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "イベント限定"
        ],
        "styles": [
            {
                "id": "p25_ハロピカ-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p25_ハロピカ-2",
                "name": "たれみみ寝",
                "rarity": 2
            }
        ]
    },
    {
        "id": "p25_ホリピカ",
        "dexNumber": 25,
        "name": "ホリピカ",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "イベント限定"
        ],
        "styles": [
            {
                "id": "p25_ホリピカ-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p25_ホリピカ-2",
                "name": "プレゼント寝",
                "rarity": 2
            }
        ]
    },
    {
        "id": "p26_ライチュウ",
        "dexNumber": 26,
        "name": "ライチュウ",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p26_ライチュウ-1",
                "name": "しっぽゆらゆら寝",
                "rarity": 1
            },
            {
                "id": "p26_ライチュウ-2",
                "name": "すわり寝",
                "rarity": 2
            },
            {
                "id": "p26_ライチュウ-3",
                "name": "しっぽアース寝",
                "rarity": 3
            },
            {
                "id": "p26_ライチュウ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p35_ピッピ",
        "dexNumber": 35,
        "name": "ピッピ",
        "type": "フェアリー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ウノハナ雪原",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p35_ピッピ-1",
                "name": "おだやか寝",
                "rarity": 1
            },
            {
                "id": "p35_ピッピ-2",
                "name": "こっくり寝",
                "rarity": 2
            },
            {
                "id": "p35_ピッピ-3",
                "name": "ゆびをふる寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p35_ピッピ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p36_ピクシー",
        "dexNumber": 36,
        "name": "ピクシー",
        "type": "フェアリー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ウノハナ雪原",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p36_ピクシー-1",
                "name": "おだやか寝",
                "rarity": 1
            },
            {
                "id": "p36_ピクシー-2",
                "name": "こっくり寝",
                "rarity": 2
            },
            {
                "id": "p36_ピクシー-3",
                "name": "ゆびをふる寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p36_ピクシー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p37_ロコン",
        "dexNumber": 37,
        "name": "ロコン",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p37_ロコン-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p37_ロコン-2",
                "name": "こっくり寝",
                "rarity": 2
            },
            {
                "id": "p37_ロコン-3",
                "name": "ひのこ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p37_ロコン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p37_ロコン（アローラのすがた）",
        "dexNumber": 37,
        "name": "ロコン（アローラのすがた）",
        "type": "こおり",
        "sleepType": "ぐっすり",
        "fields": [
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p37_ロコン（アローラのすがた）-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p37_ロコン（アローラのすがた）-2",
                "name": "こっくり寝",
                "rarity": 2
            },
            {
                "id": "p37_ロコン（アローラのすがた）-3",
                "name": "こなゆき寝",
                "rarity": 3
            },
            {
                "id": "p37_ロコン（アローラのすがた）-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p38_キュウコン",
        "dexNumber": 38,
        "name": "キュウコン",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p38_キュウコン-1",
                "name": "のび寝",
                "rarity": 1
            },
            {
                "id": "p38_キュウコン-2",
                "name": "しっぽふわり寝",
                "rarity": 2
            },
            {
                "id": "p38_キュウコン-3",
                "name": "しっぽふとん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p38_キュウコン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p38_キュウコン（アローラのすがた）",
        "dexNumber": 38,
        "name": "キュウコン（アローラのすがた）",
        "type": "こおり",
        "sleepType": "ぐっすり",
        "fields": [
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p38_キュウコン（アローラのすがた）-1",
                "name": "のび寝",
                "rarity": 1
            },
            {
                "id": "p38_キュウコン（アローラのすがた）-2",
                "name": "しっぽふとん寝",
                "rarity": 2
            },
            {
                "id": "p38_キュウコン（アローラのすがた）-3",
                "name": "しっぽつつまれ寝",
                "rarity": 3
            },
            {
                "id": "p38_キュウコン（アローラのすがた）-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p39_プリン",
        "dexNumber": 39,
        "name": "プリン",
        "type": "フェアリー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p39_プリン-1",
                "name": "すわり寝",
                "rarity": 1
            },
            {
                "id": "p39_プリン-2",
                "name": "ぼんやり寝",
                "rarity": 2
            },
            {
                "id": "p39_プリン-3",
                "name": "うたう寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p39_プリン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p40_プクリン",
        "dexNumber": 40,
        "name": "プクリン",
        "type": "フェアリー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟"
        ],
        "styles": [
            {
                "id": "p40_プクリン-1",
                "name": "おだやか寝",
                "rarity": 1
            },
            {
                "id": "p40_プクリン-2",
                "name": "びっくり寝",
                "rarity": 2
            },
            {
                "id": "p40_プクリン-3",
                "name": "ぷくぷく寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p40_プクリン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p50_ディグダ",
        "dexNumber": 50,
        "name": "ディグダ",
        "type": "じめん",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ゴールド旧発電所"
        ],
        "styles": [
            {
                "id": "p50_ディグダ-1",
                "name": "ちちゅう寝",
                "rarity": 1
            },
            {
                "id": "p50_ディグダ-2",
                "name": "ちじょう寝",
                "rarity": 2
            },
            {
                "id": "p50_ディグダ-3",
                "name": "あなをほる寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            }
        ]
    },
    {
        "id": "p51_ダグトリオ",
        "dexNumber": 51,
        "name": "ダグトリオ",
        "type": "じめん",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ゴールド旧発電所"
        ],
        "styles": [
            {
                "id": "p51_ダグトリオ-1",
                "name": "ちちゅう寝",
                "rarity": 1
            },
            {
                "id": "p51_ダグトリオ-2",
                "name": "ちじょう寝",
                "rarity": 2
            },
            {
                "id": "p51_ダグトリオ-3",
                "name": "みつごなかよし寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            }
        ]
    },
    {
        "id": "p52_ニャース",
        "dexNumber": 52,
        "name": "ニャース",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p52_ニャース-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p52_ニャース-2",
                "name": "すわり寝",
                "rarity": 2
            },
            {
                "id": "p52_ニャース-3",
                "name": "ネコこばん寝",
                "rarity": 3
            },
            {
                "id": "p52_ニャース-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p53_ペルシアン",
        "dexNumber": 53,
        "name": "ペルシアン",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p53_ペルシアン-1",
                "name": "ゆうが寝",
                "rarity": 1
            },
            {
                "id": "p53_ペルシアン-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p53_ペルシアン-3",
                "name": "ごめん寝",
                "rarity": 3
            },
            {
                "id": "p53_ペルシアン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p54_コダック",
        "dexNumber": 54,
        "name": "コダック",
        "type": "みず",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p54_コダック-1",
                "name": "ずつう寝",
                "rarity": 1
            },
            {
                "id": "p54_コダック-2",
                "name": "おおあくび寝",
                "rarity": 2
            },
            {
                "id": "p54_コダック-3",
                "name": "やだやだ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p54_コダック-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p55_ゴルダック",
        "dexNumber": 55,
        "name": "ゴルダック",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "シアンの砂浜"
        ],
        "styles": [
            {
                "id": "p55_ゴルダック-1",
                "name": "うでまくら寝",
                "rarity": 1
            },
            {
                "id": "p55_ゴルダック-2",
                "name": "おしりかき寝",
                "rarity": 2
            },
            {
                "id": "p55_ゴルダック-3",
                "name": "およぎ寝",
                "rarity": 3
            },
            {
                "id": "p55_ゴルダック-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p56_マンキー",
        "dexNumber": 56,
        "name": "マンキー",
        "type": "かくとう",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p56_マンキー-1",
                "name": "おこり寝",
                "rarity": 1
            },
            {
                "id": "p56_マンキー-2",
                "name": "ぼうだち寝",
                "rarity": 2
            },
            {
                "id": "p56_マンキー-3",
                "name": "おだやか寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p56_マンキー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p57_オコリザル",
        "dexNumber": 57,
        "name": "オコリザル",
        "type": "かくとう",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p57_オコリザル-1",
                "name": "おこり寝",
                "rarity": 1
            },
            {
                "id": "p57_オコリザル-2",
                "name": "じだんだ寝",
                "rarity": 2
            },
            {
                "id": "p57_オコリザル-3",
                "name": "おだやか寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p57_オコリザル-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p58_ガーディ",
        "dexNumber": 58,
        "name": "ガーディ",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p58_ガーディ-1",
                "name": "のび寝",
                "rarity": 1
            },
            {
                "id": "p58_ガーディ-2",
                "name": "おすわり寝",
                "rarity": 2
            },
            {
                "id": "p58_ガーディ-3",
                "name": "へそてん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p58_ガーディ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p59_ウインディ",
        "dexNumber": 59,
        "name": "ウインディ",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "トープ洞窟",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p59_ウインディ-1",
                "name": "ふせ寝",
                "rarity": 1
            },
            {
                "id": "p59_ウインディ-2",
                "name": "おすわり寝",
                "rarity": 2
            },
            {
                "id": "p59_ウインディ-3",
                "name": "へそてん寝",
                "rarity": 3
            },
            {
                "id": "p59_ウインディ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p69_マダツボミ",
        "dexNumber": 69,
        "name": "マダツボミ",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p69_マダツボミ-1",
                "name": "あしのばし寝",
                "rarity": 1
            },
            {
                "id": "p69_マダツボミ-2",
                "name": "ようかいえき寝",
                "rarity": 2
            },
            {
                "id": "p69_マダツボミ-3",
                "name": "ねをはる寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p69_マダツボミ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p70_ウツドン",
        "dexNumber": 70,
        "name": "ウツドン",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p70_ウツドン-1",
                "name": "ようかいえき寝",
                "rarity": 1
            },
            {
                "id": "p70_ウツドン-2",
                "name": "ふゆう寝",
                "rarity": 2
            },
            {
                "id": "p70_ウツドン-3",
                "name": "くっつき寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p70_ウツドン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p71_ウツボット",
        "dexNumber": 71,
        "name": "ウツボット",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p71_ウツボット-1",
                "name": "ばふばふ寝",
                "rarity": 1
            },
            {
                "id": "p71_ウツボット-2",
                "name": "つるささえ寝",
                "rarity": 2
            },
            {
                "id": "p71_ウツボット-3",
                "name": "ひっくりかえり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p71_ウツボット-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p74_イシツブテ",
        "dexNumber": 74,
        "name": "イシツブテ",
        "type": "いわ",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ウノハナ雪原",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p74_イシツブテ-1",
                "name": "うでぐみ寝",
                "rarity": 1,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p74_イシツブテ-2",
                "name": "がまん寝",
                "rarity": 2,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p74_イシツブテ-3",
                "name": "めりこみ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p74_イシツブテ-4",
                "name": "おなかのうえ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            }
        ]
    },
    {
        "id": "p75_ゴローン",
        "dexNumber": 75,
        "name": "ゴローン",
        "type": "いわ",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p75_ゴローン-1",
                "name": "ごろーん寝",
                "rarity": 1,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p75_ゴローン-2",
                "name": "ごうかい寝",
                "rarity": 2,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p75_ゴローン-3",
                "name": "ごろごろ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p75_ゴローン-4",
                "name": "おなかのうえ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            }
        ]
    },
    {
        "id": "p76_ゴローニャ",
        "dexNumber": 76,
        "name": "ゴローニャ",
        "type": "いわ",
        "sleepType": "ぐっすり",
        "fields": [
            "トープ洞窟"
        ],
        "styles": [
            {
                "id": "p76_ゴローニャ-1",
                "name": "どっしり寝",
                "rarity": 1
            },
            {
                "id": "p76_ゴローニャ-2",
                "name": "におうだち寝",
                "rarity": 2
            },
            {
                "id": "p76_ゴローニャ-3",
                "name": "ごろごろ寝",
                "rarity": 3
            },
            {
                "id": "p76_ゴローニャ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p79_ヤドン",
        "dexNumber": 79,
        "name": "ヤドン",
        "type": "みず",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p79_ヤドン-1",
                "name": "ぐでぐで寝",
                "rarity": 1
            },
            {
                "id": "p79_ヤドン-2",
                "name": "ぼーっと寝",
                "rarity": 2
            },
            {
                "id": "p79_ヤドン-3",
                "name": "まぬけだ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p79_ヤドン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p80_ヤドラン",
        "dexNumber": 80,
        "name": "ヤドラン",
        "type": "みず",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p80_ヤドラン-1",
                "name": "なかよし寝",
                "rarity": 1
            },
            {
                "id": "p80_ヤドラン-2",
                "name": "よだれ寝",
                "rarity": 2
            },
            {
                "id": "p80_ヤドラン-3",
                "name": "しっぽかまれ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p80_ヤドラン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p81_コイル",
        "dexNumber": 81,
        "name": "コイル",
        "type": "はがね",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p81_コイル-1",
                "name": "かたむきふゆう寝",
                "rarity": 1
            },
            {
                "id": "p81_コイル-2",
                "name": "でんじふゆう寝",
                "rarity": 2
            },
            {
                "id": "p81_コイル-3",
                "name": "さかさふゆう寝",
                "rarity": 3
            }
        ]
    },
    {
        "id": "p82_レアコイル",
        "dexNumber": 82,
        "name": "レアコイル",
        "type": "はがね",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p82_レアコイル-1",
                "name": "れんけつふゆう寝",
                "rarity": 1
            },
            {
                "id": "p82_レアコイル-2",
                "name": "おちかけふゆう寝",
                "rarity": 2
            },
            {
                "id": "p82_レアコイル-3",
                "name": "ばらばらふゆう寝",
                "rarity": 3
            }
        ]
    },
    {
        "id": "p83_カモネギ",
        "dexNumber": 83,
        "name": "カモネギ",
        "type": "ノーマル",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p83_カモネギ-1",
                "name": "ぺったり寝",
                "rarity": 1
            },
            {
                "id": "p83_カモネギ-2",
                "name": "クキかまえ寝",
                "rarity": 2
            },
            {
                "id": "p83_カモネギ-3",
                "name": "クキかみ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p83_カモネギ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p84_ドードー",
        "dexNumber": 84,
        "name": "ドードー",
        "type": "ノーマル",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p84_ドードー-1",
                "name": "見張り寝",
                "rarity": 1
            },
            {
                "id": "p84_ドードー-2",
                "name": "みはりさぼり寝",
                "rarity": 2
            },
            {
                "id": "p84_ドードー-3",
                "name": "ふたご寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p84_ドードー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p85_ドードリオ",
        "dexNumber": 85,
        "name": "ドードリオ",
        "type": "ノーマル",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p85_ドードリオ-1",
                "name": "みはり寝",
                "rarity": 1
            },
            {
                "id": "p85_ドードリオ-2",
                "name": "みはりさぼり寝",
                "rarity": 2
            },
            {
                "id": "p85_ドードリオ-3",
                "name": "みつご寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p85_ドードリオ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p92_ゴース",
        "dexNumber": 92,
        "name": "ゴース",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ウノハナ雪原",
            "ゴールド旧発電所"
        ],
        "styles": [
            {
                "id": "p92_ゴース-1",
                "name": "にこにこ寝",
                "rarity": 1
            },
            {
                "id": "p92_ゴース-2",
                "name": "ガスふゆう寝",
                "rarity": 2
            },
            {
                "id": "p92_ゴース-3",
                "name": "べろべろばー寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            }
        ]
    },
    {
        "id": "p93_ゴースト",
        "dexNumber": 93,
        "name": "ゴースト",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ウノハナ雪原",
            "ゴールド旧発電所"
        ],
        "styles": [
            {
                "id": "p93_ゴースト-1",
                "name": "くびかしげ寝",
                "rarity": 1
            },
            {
                "id": "p93_ゴースト-2",
                "name": "ガスふゆう寝",
                "rarity": 2
            },
            {
                "id": "p93_ゴースト-3",
                "name": "べろべろばー寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            }
        ]
    },
    {
        "id": "p94_ゲンガー",
        "dexNumber": 94,
        "name": "ゲンガー",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "トープ洞窟",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p94_ゲンガー-1",
                "name": "いたずら寝",
                "rarity": 1,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p94_ゲンガー-2",
                "name": "にやにや寝",
                "rarity": 2,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p94_ゲンガー-3",
                "name": "べろべろばー寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p94_ゲンガー-4",
                "name": "おなかのうえ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            }
        ]
    },
    {
        "id": "p95_イワーク",
        "dexNumber": 95,
        "name": "イワーク",
        "type": "いわ",
        "sleepType": "ぐっすり",
        "fields": [
            "トープ洞窟",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p95_イワーク-1",
                "name": "うずまき寝",
                "rarity": 1
            },
            {
                "id": "p95_イワーク-2",
                "name": "ぐらぐら寝",
                "rarity": 2
            },
            {
                "id": "p95_イワーク-3",
                "name": "ほりすすむ寝",
                "rarity": 3
            }
        ]
    },
    {
        "id": "p104_カラカラ",
        "dexNumber": 104,
        "name": "カラカラ",
        "type": "じめん",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p104_カラカラ-1",
                "name": "しくしく寝",
                "rarity": 1
            },
            {
                "id": "p104_カラカラ-2",
                "name": "ほねかき寝",
                "rarity": 2
            },
            {
                "id": "p104_カラカラ-3",
                "name": "ホネまくら寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p104_カラカラ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p105_ガラガラ",
        "dexNumber": 105,
        "name": "ガラガラ",
        "type": "じめん",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p105_ガラガラ-1",
                "name": "ホネだき寝",
                "rarity": 1
            },
            {
                "id": "p105_ガラガラ-2",
                "name": "ほねかき寝",
                "rarity": 2
            },
            {
                "id": "p105_ガラガラ-3",
                "name": "ホネまくら寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p105_ガラガラ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p113_ラッキー",
        "dexNumber": 113,
        "name": "ラッキー",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p113_ラッキー-1",
                "name": "すわり寝",
                "rarity": 1
            },
            {
                "id": "p113_ラッキー-2",
                "name": "こっくり寝",
                "rarity": 2
            },
            {
                "id": "p113_ラッキー-3",
                "name": "タマゴだいじ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p113_ラッキー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p115_ガルーラ",
        "dexNumber": 115,
        "name": "ガルーラ",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p115_ガルーラ-1",
                "name": "おやこあい寝",
                "rarity": 1
            },
            {
                "id": "p115_ガルーラ-2",
                "name": "おやこシンクロ寝",
                "rarity": 2
            },
            {
                "id": "p115_ガルーラ-3",
                "name": "さきにおきた寝",
                "rarity": 3
            },
            {
                "id": "p115_ガルーラ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p122_バリヤード",
        "dexNumber": 122,
        "name": "バリヤード",
        "type": "エスパー",
        "sleepType": "すやすや",
        "fields": [
            "シアンの砂浜",
            "ゴールド旧発電所"
        ],
        "styles": [
            {
                "id": "p122_バリヤード-1",
                "name": "マイムのかべ寝",
                "rarity": 1
            },
            {
                "id": "p122_バリヤード-2",
                "name": "こいしコツン寝",
                "rarity": 2
            },
            {
                "id": "p122_バリヤード-3",
                "name": "マイムのベッド寝",
                "rarity": 3
            },
            {
                "id": "p122_バリヤード-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p127_カイロス",
        "dexNumber": 127,
        "name": "カイロス",
        "type": "むし",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p127_カイロス-1",
                "name": "だいたん寝",
                "rarity": 1
            },
            {
                "id": "p127_カイロス-2",
                "name": "ぼうだち寝",
                "rarity": 2
            },
            {
                "id": "p127_カイロス-3",
                "name": "もぐり寝",
                "rarity": 3
            },
            {
                "id": "p127_カイロス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p132_メタモン",
        "dexNumber": 132,
        "name": "メタモン",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ウノハナ雪原",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p132_メタモン-1",
                "name": "石にへんしん寝",
                "rarity": 1
            },
            {
                "id": "p132_メタモン-2",
                "name": "そのまま寝",
                "rarity": 2
            },
            {
                "id": "p132_メタモン-3",
                "name": "ピカチュウ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "トープ洞窟",
                    "ウノハナ雪原"
                ]
            },
            {
                "id": "p132_メタモン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            },
            {
                "id": "p132_メタモン-5",
                "name": "フシギダネ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "シアンの砂浜",
                    "トープ洞窟",
                    "ウノハナ雪原",
                    "ラピスラズリ湖畔",
                    "ゴールド旧発電所",
                    "アンバー渓谷"
                ]
            },
            {
                "id": "p132_メタモン-6",
                "name": "ヒトカゲ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "シアンの砂浜",
                    "ウノハナ雪原",
                    "ラピスラズリ湖畔",
                    "ゴールド旧発電所",
                    "アンバー渓谷"
                ]
            },
            {
                "id": "p132_メタモン-7",
                "name": "ゼニガメ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "トープ洞窟",
                    "ウノハナ雪原",
                    "ラピスラズリ湖畔",
                    "ゴールド旧発電所",
                    "アンバー渓谷"
                ]
            },
            {
                "id": "p132_メタモン-8",
                "name": "ゲンガー寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "シアンの砂浜",
                    "トープ洞窟",
                    "ウノハナ雪原",
                    "ラピスラズリ湖畔",
                    "アンバー渓谷"
                ]
            },
            {
                "id": "p132_メタモン-9",
                "name": "カイリュー寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "シアンの砂浜",
                    "トープ洞窟",
                    "ウノハナ雪原",
                    "ゴールド旧発電所",
                    "アンバー渓谷",
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p132_メタモン-10",
                "name": "ヨーギラス寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "シアンの砂浜",
                    "トープ洞窟",
                    "ウノハナ雪原",
                    "ラピスラズリ湖畔",
                    "ゴールド旧発電所"
                ]
            },
            {
                "id": "p132_メタモン-11",
                "name": "グレイシア寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "シアンの砂浜",
                    "トープ洞窟",
                    "ラピスラズリ湖畔",
                    "ゴールド旧発電所",
                    "アンバー渓谷",
                    "ワカクサ本島EX"
                ]
            }
        ]
    },
    {
        "id": "p133_イーブイ",
        "dexNumber": 133,
        "name": "イーブイ",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ウノハナ雪原",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p133_イーブイ-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p133_イーブイ-2",
                "name": "たれみみ寝",
                "rarity": 2
            },
            {
                "id": "p133_イーブイ-3",
                "name": "げんきいっぱい寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p133_イーブイ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p133_ホリデーイーブイ",
        "dexNumber": 133,
        "name": "ホリデーイーブイ",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "イベント限定"
        ],
        "styles": [
            {
                "id": "p133_ホリデーイーブイ-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p133_ホリデーイーブイ-2",
                "name": "プレゼント寝",
                "rarity": 2
            }
        ]
    },
    {
        "id": "p133_ハロウィンイーブイ",
        "dexNumber": 133,
        "name": "ハロウィンイーブイ",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "イベント限定"
        ],
        "styles": [
            {
                "id": "p133_ハロウィンイーブイ-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p133_ハロウィンイーブイ-2",
                "name": "たれみみ寝",
                "rarity": 2
            }
        ]
    },
    {
        "id": "p134_シャワーズ",
        "dexNumber": 134,
        "name": "シャワーズ",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p134_シャワーズ-1",
                "name": "おびれふり寝",
                "rarity": 1
            },
            {
                "id": "p134_シャワーズ-2",
                "name": "おすわり寝",
                "rarity": 2
            },
            {
                "id": "p134_シャワーズ-3",
                "name": "ぺったり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p134_シャワーズ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p135_サンダース",
        "dexNumber": 135,
        "name": "サンダース",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p135_サンダース-1",
                "name": "ふせ寝",
                "rarity": 1
            },
            {
                "id": "p135_サンダース-2",
                "name": "おすわり寝",
                "rarity": 2
            },
            {
                "id": "p135_サンダース-3",
                "name": "ゆめではしり寝",
                "rarity": 3
            },
            {
                "id": "p135_サンダース-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p136_ブースター",
        "dexNumber": 136,
        "name": "ブースター",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p136_ブースター-1",
                "name": "しっぽをふる寝",
                "rarity": 1
            },
            {
                "id": "p136_ブースター-2",
                "name": "こうばこずわり寝",
                "rarity": 2
            },
            {
                "id": "p136_ブースター-3",
                "name": "しっぽくるまり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p136_ブースター-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p147_ミニリュウ",
        "dexNumber": 147,
        "name": "ミニリュウ",
        "type": "ドラゴン",
        "sleepType": "うとうと",
        "fields": [
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p147_ミニリュウ-1",
                "name": "とぐろ寝",
                "rarity": 1
            },
            {
                "id": "p147_ミニリュウ-2",
                "name": "くねく寝",
                "rarity": 2
            },
            {
                "id": "p147_ミニリュウ-3",
                "name": "ほぐれ寝",
                "rarity": 3
            },
            {
                "id": "p147_ミニリュウ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p148_ハクリュー",
        "dexNumber": 148,
        "name": "ハクリュー",
        "type": "ドラゴン",
        "sleepType": "うとうと",
        "fields": [
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p148_ハクリュー-1",
                "name": "とぐろ寝",
                "rarity": 1
            },
            {
                "id": "p148_ハクリュー-2",
                "name": "ほぐれ寝",
                "rarity": 2
            },
            {
                "id": "p148_ハクリュー-3",
                "name": "ほぐれ寝",
                "rarity": 3
            },
            {
                "id": "p148_ハクリュー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p149_カイリュー",
        "dexNumber": 149,
        "name": "カイリュー",
        "type": "ドラゴン",
        "sleepType": "うとうと",
        "fields": [
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p149_カイリュー-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p149_カイリュー-2",
                "name": "すわり寝",
                "rarity": 2
            },
            {
                "id": "p149_カイリュー-3",
                "name": "おなかだし寝",
                "rarity": 3
            },
            {
                "id": "p149_カイリュー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p152_チコリータ",
        "dexNumber": 152,
        "name": "チコリータ",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p152_チコリータ-1",
                "name": "はっぱまわし寝",
                "rarity": 1
            },
            {
                "id": "p152_チコリータ-2",
                "name": "はっぱたれ寝",
                "rarity": 2
            },
            {
                "id": "p152_チコリータ-3",
                "name": "へそてん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p152_チコリータ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p153_ベイリーフ",
        "dexNumber": 153,
        "name": "ベイリーフ",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p153_ベイリーフ-1",
                "name": "のび寝",
                "rarity": 1
            },
            {
                "id": "p153_ベイリーフ-2",
                "name": "つぼみふり寝",
                "rarity": 2
            },
            {
                "id": "p153_ベイリーフ-3",
                "name": "かおりただよい寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p153_ベイリーフ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p154_メガニウム",
        "dexNumber": 154,
        "name": "メガニウム",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p154_メガニウム-1",
                "name": "おだやか寝",
                "rarity": 1
            },
            {
                "id": "p154_メガニウム-2",
                "name": "くびふり寝",
                "rarity": 2
            },
            {
                "id": "p154_メガニウム-3",
                "name": "はながさいた寝",
                "rarity": 3
            },
            {
                "id": "p154_メガニウム-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p155_ヒノアラシ",
        "dexNumber": 155,
        "name": "ヒノアラシ",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p155_ヒノアラシ-1",
                "name": "ぺったり寝",
                "rarity": 1
            },
            {
                "id": "p155_ヒノアラシ-2",
                "name": "せなかまるめ寝",
                "rarity": 2
            },
            {
                "id": "p155_ヒノアラシ-3",
                "name": "ほのおふきあげ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p155_ヒノアラシ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p156_マグマラシ",
        "dexNumber": 156,
        "name": "マグマラシ",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p156_マグマラシ-1",
                "name": "うでまくら寝",
                "rarity": 1
            },
            {
                "id": "p156_マグマラシ-2",
                "name": "つっぷし寝",
                "rarity": 2
            },
            {
                "id": "p156_マグマラシ-3",
                "name": "ほのおふきあげ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p156_マグマラシ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p157_バクフーン",
        "dexNumber": 157,
        "name": "バクフーン",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p157_バクフーン-1",
                "name": "うでまくら寝",
                "rarity": 1
            },
            {
                "id": "p157_バクフーン-2",
                "name": "けづくろい寝",
                "rarity": 2
            },
            {
                "id": "p157_バクフーン-3",
                "name": "ほのおふきあげ寝",
                "rarity": 3
            },
            {
                "id": "p157_バクフーン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p158_ワニノコ",
        "dexNumber": 158,
        "name": "ワニノコ",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p158_ワニノコ-1",
                "name": "はんきゅう寝",
                "rarity": 1
            },
            {
                "id": "p158_ワニノコ-2",
                "name": "あまがみ寝",
                "rarity": 2
            },
            {
                "id": "p158_ワニノコ-3",
                "name": "おおぐちあけ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p158_ワニノコ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p159_アリゲイツ",
        "dexNumber": 159,
        "name": "アリゲイツ",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p159_アリゲイツ-1",
                "name": "はんきゅう寝",
                "rarity": 1
            },
            {
                "id": "p159_アリゲイツ-2",
                "name": "キバみせ寝",
                "rarity": 2
            },
            {
                "id": "p159_アリゲイツ-3",
                "name": "おおぐちあけ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p159_アリゲイツ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p160_オーダイル",
        "dexNumber": 160,
        "name": "オーダイル",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p160_オーダイル-1",
                "name": "はんきゅう寝",
                "rarity": 1
            },
            {
                "id": "p160_オーダイル-2",
                "name": "いかく寝",
                "rarity": 2
            },
            {
                "id": "p160_オーダイル-3",
                "name": "おおぐちあけ寝",
                "rarity": 3
            },
            {
                "id": "p160_オーダイル-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p172_ピチュー",
        "dexNumber": 172,
        "name": "ピチュー",
        "type": "でんき",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p172_ピチュー-1",
                "name": "おだやか寝",
                "rarity": 1
            },
            {
                "id": "p172_ピチュー-2",
                "name": "すわり寝",
                "rarity": 2
            },
            {
                "id": "p172_ピチュー-3",
                "name": "ほうでん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p172_ピチュー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p173_ピィ",
        "dexNumber": 173,
        "name": "ピィ",
        "type": "フェアリー",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ウノハナ雪原",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p173_ピィ-1",
                "name": "ころころ寝",
                "rarity": 1
            },
            {
                "id": "p173_ピィ-2",
                "name": "こっくり寝",
                "rarity": 2
            },
            {
                "id": "p173_ピィ-3",
                "name": "ひっくりかえり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p173_ピィ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p174_ププリン",
        "dexNumber": 174,
        "name": "ププリン",
        "type": "フェアリー",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p174_ププリン-1",
                "name": "はずみ寝",
                "rarity": 1
            },
            {
                "id": "p174_ププリン-2",
                "name": "ぼんやり寝",
                "rarity": 2
            },
            {
                "id": "p174_ププリン-3",
                "name": "うたう寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p174_ププリン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p175_トゲピー",
        "dexNumber": 175,
        "name": "トゲピー",
        "type": "フェアリー",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p175_トゲピー-1",
                "name": "ころころ寝",
                "rarity": 1
            },
            {
                "id": "p175_トゲピー-2",
                "name": "ひっくりかえり寝",
                "rarity": 2
            },
            {
                "id": "p175_トゲピー-3",
                "name": "カラのなか寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p175_トゲピー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p176_トゲチック",
        "dexNumber": 176,
        "name": "トゲチック",
        "type": "フェアリー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p176_トゲチック-1",
                "name": "すわりはばたき寝",
                "rarity": 1
            },
            {
                "id": "p176_トゲチック-2",
                "name": "たちはばたき寝",
                "rarity": 2
            },
            {
                "id": "p176_トゲチック-3",
                "name": "うかびぱたぱた寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p176_トゲチック-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p177_ネイティ",
        "dexNumber": 177,
        "name": "ネイティ",
        "type": "エスパー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p177_ネイティ-1",
                "name": "ゆめでジャンプ寝",
                "rarity": 1
            },
            {
                "id": "p177_ネイティ-2",
                "name": "はねひろげ寝",
                "rarity": 2
            },
            {
                "id": "p177_ネイティ-3",
                "name": "ぱたぱた寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p177_ネイティ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p178_ネイティオ",
        "dexNumber": 178,
        "name": "ネイティオ",
        "type": "エスパー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p178_ネイティオ-1",
                "name": "みらいよち寝",
                "rarity": 1
            },
            {
                "id": "p178_ネイティオ-2",
                "name": "くびふり寝",
                "rarity": 2
            },
            {
                "id": "p178_ネイティオ-3",
                "name": "はねひろげ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p178_ネイティオ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p179_メリープ",
        "dexNumber": 179,
        "name": "メリープ",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p179_メリープ-1",
                "name": "もこもこ寝",
                "rarity": 1
            },
            {
                "id": "p179_メリープ-2",
                "name": "ひづめかき寝",
                "rarity": 2
            },
            {
                "id": "p179_メリープ-3",
                "name": "しっぽひかり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p179_メリープ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p180_モココ",
        "dexNumber": 180,
        "name": "モココ",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p180_モココ-1",
                "name": "ぺったり寝",
                "rarity": 1
            },
            {
                "id": "p180_モココ-2",
                "name": "もこもこ寝",
                "rarity": 2
            },
            {
                "id": "p180_モココ-3",
                "name": "しっぽひかり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p180_モココ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p181_デンリュウ",
        "dexNumber": 181,
        "name": "デンリュウ",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ウノハナ雪原",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p181_デンリュウ-1",
                "name": "しっぽかき寝",
                "rarity": 1
            },
            {
                "id": "p181_デンリュウ-2",
                "name": "くびふり寝",
                "rarity": 2
            },
            {
                "id": "p181_デンリュウ-3",
                "name": "しっぽかがやき寝",
                "rarity": 3
            },
            {
                "id": "p181_デンリュウ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p185_ウソッキー",
        "dexNumber": 185,
        "name": "ウソッキー",
        "type": "いわ",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p185_ウソッキー-1",
                "name": "きのふり寝",
                "rarity": 1
            },
            {
                "id": "p185_ウソッキー-2",
                "name": "きのふりさぼり寝",
                "rarity": 2
            },
            {
                "id": "p185_ウソッキー-3",
                "name": "きのふりしない寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p185_ウソッキー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p194_ウパー",
        "dexNumber": 194,
        "name": "ウパー",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p194_ウパー-1",
                "name": "にこにこ寝",
                "rarity": 1,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p194_ウパー-2",
                "name": "おおあくび寝",
                "rarity": 2,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p194_ウパー-3",
                "name": "どろにうかび寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p194_ウパー-4",
                "name": "おなかのうえ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            }
        ]
    },
    {
        "id": "p194_ウパー（パルデアのすがた）",
        "dexNumber": 194,
        "name": "ウパー（パルデアのすがた）",
        "type": "どく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p194_ウパー（パルデアのすがた）-1",
                "name": "にこにこ寝",
                "rarity": 1
            },
            {
                "id": "p194_ウパー（パルデアのすがた）-2",
                "name": "おおあくび寝",
                "rarity": 2
            },
            {
                "id": "p194_ウパー（パルデアのすがた）-3",
                "name": "どろにうまり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p194_ウパー（パルデアのすがた）-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p195_ヌオー",
        "dexNumber": 195,
        "name": "ヌオー",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p195_ヌオー-1",
                "name": "にこにこ寝",
                "rarity": 1,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p195_ヌオー-2",
                "name": "おおあくび寝",
                "rarity": 2,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p195_ヌオー-3",
                "name": "どろうかび寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島",
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p195_ヌオー-4",
                "name": "おなかのうえ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            }
        ]
    },
    {
        "id": "p196_エーフィ",
        "dexNumber": 196,
        "name": "エーフィ",
        "type": "エスパー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p196_エーフィ-1",
                "name": "よち寝",
                "rarity": 1
            },
            {
                "id": "p196_エーフィ-2",
                "name": "おすわり寝",
                "rarity": 2
            },
            {
                "id": "p196_エーフィ-3",
                "name": "へそてん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p196_エーフィ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p197_ブラッキー",
        "dexNumber": 197,
        "name": "ブラッキー",
        "type": "あく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p197_ブラッキー-1",
                "name": "みかづき寝",
                "rarity": 1
            },
            {
                "id": "p197_ブラッキー-2",
                "name": "おすわり寝",
                "rarity": 2
            },
            {
                "id": "p197_ブラッキー-3",
                "name": "へそてん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p197_ブラッキー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p198_ヤミカラス",
        "dexNumber": 198,
        "name": "ヤミカラス",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p198_ヤミカラス-1",
                "name": "はづくろい寝",
                "rarity": 1
            },
            {
                "id": "p198_ヤミカラス-2",
                "name": "おおあくび寝",
                "rarity": 2
            },
            {
                "id": "p198_ヤミカラス-3",
                "name": "ほうせきあつめ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p198_ヤミカラス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p199_ヤドキング",
        "dexNumber": 199,
        "name": "ヤドキング",
        "type": "みず",
        "sleepType": "すやすや",
        "fields": [
            "シアンの砂浜"
        ],
        "styles": [
            {
                "id": "p199_ヤドキング-1",
                "name": "ぐうたら寝",
                "rarity": 1
            },
            {
                "id": "p199_ヤドキング-2",
                "name": "けんじゃ寝",
                "rarity": 2
            },
            {
                "id": "p199_ヤドキング-3",
                "name": "ひらめき寝",
                "rarity": 3
            },
            {
                "id": "p199_ヤドキング-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p202_ソーナンス",
        "dexNumber": 202,
        "name": "ソーナンス",
        "type": "エスパー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p202_ソーナンス-1",
                "name": "しっぽかくし寝",
                "rarity": 1
            },
            {
                "id": "p202_ソーナンス-2",
                "name": "がまん寝",
                "rarity": 2
            },
            {
                "id": "p202_ソーナンス-3",
                "name": "きめポーズ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p202_ソーナンス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p208_ハガネール",
        "dexNumber": 208,
        "name": "ハガネール",
        "type": "はがね",
        "sleepType": "ぐっすり",
        "fields": [
            "トープ洞窟",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p208_ハガネール-1",
                "name": "うずまき寝",
                "rarity": 1
            },
            {
                "id": "p208_ハガネール-2",
                "name": "ぐらぐら寝",
                "rarity": 2
            },
            {
                "id": "p208_ハガネール-3",
                "name": "ほりすすみ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ゴールド旧発電所"
                ]
            }
        ]
    },
    {
        "id": "p214_ヘラクロス",
        "dexNumber": 214,
        "name": "ヘラクロス",
        "type": "むし",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p214_ヘラクロス-1",
                "name": "ツノふり寝",
                "rarity": 1
            },
            {
                "id": "p214_ヘラクロス-2",
                "name": "ぼうだち寝",
                "rarity": 2
            },
            {
                "id": "p214_ヘラクロス-3",
                "name": "ミツなめ寝",
                "rarity": 3
            },
            {
                "id": "p214_ヘラクロス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p215_ニューラ",
        "dexNumber": 215,
        "name": "ニューラ",
        "type": "あく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p215_ニューラ-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p215_ニューラ-2",
                "name": "ぼうだち寝",
                "rarity": 2
            },
            {
                "id": "p215_ニューラ-3",
                "name": "へそてん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p215_ニューラ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p225_デリバード",
        "dexNumber": 225,
        "name": "デリバード",
        "type": "ひこう",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p225_デリバード-1",
                "name": "おだやか寝",
                "rarity": 1
            },
            {
                "id": "p225_デリバード-2",
                "name": "よろこび寝",
                "rarity": 2
            },
            {
                "id": "p225_デリバード-3",
                "name": "プレゼント寝",
                "rarity": 3
            },
            {
                "id": "p225_デリバード-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p228_デルビル",
        "dexNumber": 228,
        "name": "デルビル",
        "type": "あく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p228_デルビル-1",
                "name": "とおぼえ寝",
                "rarity": 1
            },
            {
                "id": "p228_デルビル-2",
                "name": "のび寝",
                "rarity": 2
            },
            {
                "id": "p228_デルビル-3",
                "name": "へそてん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p228_デルビル-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p229_ヘルガー",
        "dexNumber": 229,
        "name": "ヘルガー",
        "type": "あく",
        "sleepType": "うとうと",
        "fields": [
            "トープ洞窟",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p229_ヘルガー-1",
                "name": "ふせ寝",
                "rarity": 1
            },
            {
                "id": "p229_ヘルガー-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p229_ヘルガー-3",
                "name": "ほのおのはき寝",
                "rarity": 3
            },
            {
                "id": "p229_ヘルガー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p242_ハピナス",
        "dexNumber": 242,
        "name": "ハピナス",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p242_ハピナス-1",
                "name": "すわり寝",
                "rarity": 1
            },
            {
                "id": "p242_ハピナス-2",
                "name": "ゆらゆら寝",
                "rarity": 2
            },
            {
                "id": "p242_ハピナス-3",
                "name": "タマゴだいじ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p242_ハピナス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p243_ライコウ",
        "dexNumber": 243,
        "name": "ライコウ",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p243_ライコウ-1",
                "name": "ちからため寝",
                "rarity": 1
            },
            {
                "id": "p243_ライコウ-2",
                "name": "めいそう寝",
                "rarity": 2
            },
            {
                "id": "p243_ライコウ-3",
                "name": "いかずち寝",
                "rarity": 3
            }
        ]
    },
    {
        "id": "p244_エンテイ",
        "dexNumber": 244,
        "name": "エンテイ",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p244_エンテイ-1",
                "name": "ちからため寝",
                "rarity": 1
            },
            {
                "id": "p244_エンテイ-2",
                "name": "めいそう寝",
                "rarity": 2
            },
            {
                "id": "p244_エンテイ-3",
                "name": "かざん寝",
                "rarity": 3
            }
        ]
    },
    {
        "id": "p245_スイクン",
        "dexNumber": 245,
        "name": "スイクン",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p245_スイクン-1",
                "name": "ちからため寝",
                "rarity": 1
            },
            {
                "id": "p245_スイクン-2",
                "name": "めいそう寝",
                "rarity": 2
            },
            {
                "id": "p245_スイクン-3",
                "name": "きたかぜ寝",
                "rarity": 3
            }
        ]
    },
    {
        "id": "p246_ヨーギラス",
        "dexNumber": 246,
        "name": "ヨーギラス",
        "type": "いわ",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p246_ヨーギラス-1",
                "name": "のび寝",
                "rarity": 1
            },
            {
                "id": "p246_ヨーギラス-2",
                "name": "かおごしごし寝",
                "rarity": 2
            },
            {
                "id": "p246_ヨーギラス-3",
                "name": "つちたべ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p246_ヨーギラス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p247_サナギラス",
        "dexNumber": 247,
        "name": "サナギラス",
        "type": "いわ",
        "sleepType": "ぐっすり",
        "fields": [
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p247_サナギラス-1",
                "name": "たおれ寝",
                "rarity": 1
            },
            {
                "id": "p247_サナギラス-2",
                "name": "ぶるぶる寝",
                "rarity": 2
            },
            {
                "id": "p247_サナギラス-3",
                "name": "ガスぬき寝",
                "rarity": 3
            },
            {
                "id": "p247_サナギラス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p248_バンギラス",
        "dexNumber": 248,
        "name": "バンギラス",
        "type": "あく",
        "sleepType": "うとうと",
        "fields": [
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p248_バンギラス-1",
                "name": "はらばい寝",
                "rarity": 1
            },
            {
                "id": "p248_バンギラス-2",
                "name": "におうだち寝",
                "rarity": 2
            },
            {
                "id": "p248_バンギラス-3",
                "name": "だいのじ寝",
                "rarity": 3
            },
            {
                "id": "p248_バンギラス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p252_キモリ",
        "dexNumber": 252,
        "name": "キモリ",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p252_キモリ-1",
                "name": "すわり寝",
                "rarity": 1
            },
            {
                "id": "p252_キモリ-2",
                "name": "かおごしごし寝",
                "rarity": 2
            },
            {
                "id": "p252_キモリ-3",
                "name": "ゆめでのぼり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p252_キモリ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p253_ジュプトル",
        "dexNumber": 253,
        "name": "ジュプトル",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p253_ジュプトル-1",
                "name": "かたひざたて寝",
                "rarity": 1
            },
            {
                "id": "p253_ジュプトル-2",
                "name": "ゆめでかまえ寝",
                "rarity": 2
            },
            {
                "id": "p253_ジュプトル-3",
                "name": "はっぱつつまれ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p253_ジュプトル-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p254_ジュカイン",
        "dexNumber": 254,
        "name": "ジュカイン",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p254_ジュカイン-1",
                "name": "どっしり寝",
                "rarity": 1
            },
            {
                "id": "p254_ジュカイン-2",
                "name": "ゆめでかまえ寝",
                "rarity": 2
            },
            {
                "id": "p254_ジュカイン-3",
                "name": "わかぎそだて寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p254_ジュカイン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p255_アチャモ",
        "dexNumber": 255,
        "name": "アチャモ",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ラピスラズリ湖畔",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p255_アチャモ-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p255_アチャモ-2",
                "name": "ぽかぽか寝",
                "rarity": 2
            },
            {
                "id": "p255_アチャモ-3",
                "name": "ころころ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p255_アチャモ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p256_ワカシャモ",
        "dexNumber": 256,
        "name": "ワカシャモ",
        "type": "かくとう",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ラピスラズリ湖畔",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p256_ワカシャモ-1",
                "name": "すわり寝",
                "rarity": 1
            },
            {
                "id": "p256_ワカシャモ-2",
                "name": "ジャンプ寝",
                "rarity": 2
            },
            {
                "id": "p256_ワカシャモ-3",
                "name": "キック寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p256_ワカシャモ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p257_バシャーモ",
        "dexNumber": 257,
        "name": "バシャーモ",
        "type": "かくとう",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ラピスラズリ湖畔",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p257_バシャーモ-1",
                "name": "かたひざたて寝",
                "rarity": 1
            },
            {
                "id": "p257_バシャーモ-2",
                "name": "きあいだめ寝",
                "rarity": 2
            },
            {
                "id": "p257_バシャーモ-3",
                "name": "ブレイズキック寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p257_バシャーモ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p258_ミズゴロウ",
        "dexNumber": 258,
        "name": "ミズゴロウ",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p258_ミズゴロウ-1",
                "name": "ヒレふり寝",
                "rarity": 1
            },
            {
                "id": "p258_ミズゴロウ-2",
                "name": "こっくり寝",
                "rarity": 2
            },
            {
                "id": "p258_ミズゴロウ-3",
                "name": "いわだき寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p258_ミズゴロウ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p259_ヌマクロー",
        "dexNumber": 259,
        "name": "ヌマクロー",
        "type": "じめん",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p259_ヌマクロー-1",
                "name": "すわり寝",
                "rarity": 1
            },
            {
                "id": "p259_ヌマクロー-2",
                "name": "ばんざい寝",
                "rarity": 2
            },
            {
                "id": "p259_ヌマクロー-3",
                "name": "どろにうまり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p259_ヌマクロー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p260_ラグラージ",
        "dexNumber": 260,
        "name": "ラグラージ",
        "type": "じめん",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p260_ラグラージ-1",
                "name": "ゆめでおよぎ寝",
                "rarity": 1
            },
            {
                "id": "p260_ラグラージ-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p260_ラグラージ-3",
                "name": "どろあそび寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p260_ラグラージ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p280_ラルトス",
        "dexNumber": 280,
        "name": "ラルトス",
        "type": "エスパー",
        "sleepType": "すやすや",
        "fields": [
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p280_ラルトス-1",
                "name": "つっぷし寝",
                "rarity": 1
            },
            {
                "id": "p280_ラルトス-2",
                "name": "もじもじ寝",
                "rarity": 2
            },
            {
                "id": "p280_ラルトス-3",
                "name": "にこにこ寝",
                "rarity": 3
            },
            {
                "id": "p280_ラルトス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p281_キルリア",
        "dexNumber": 281,
        "name": "キルリア",
        "type": "エスパー",
        "sleepType": "すやすや",
        "fields": [
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p281_キルリア-1",
                "name": "すわりおじぎ寝",
                "rarity": 1
            },
            {
                "id": "p281_キルリア-2",
                "name": "レヴェランス寝",
                "rarity": 2
            },
            {
                "id": "p281_キルリア-3",
                "name": "おどりながら寝",
                "rarity": 3
            },
            {
                "id": "p281_キルリア-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p282_サーナイト",
        "dexNumber": 282,
        "name": "サーナイト",
        "type": "エスパー",
        "sleepType": "すやすや",
        "fields": [
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p282_サーナイト-1",
                "name": "すそゆらし寝",
                "rarity": 1
            },
            {
                "id": "p282_サーナイト-2",
                "name": "はずかしい寝",
                "rarity": 2
            },
            {
                "id": "p282_サーナイト-3",
                "name": "すそひろがり寝",
                "rarity": 3
            },
            {
                "id": "p282_サーナイト-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p287_ナマケロ",
        "dexNumber": 287,
        "name": "ナマケロ",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p287_ナマケロ-1",
                "name": "なまけ寝",
                "rarity": 1
            },
            {
                "id": "p287_ナマケロ-2",
                "name": "けずくろい寝",
                "rarity": 2
            },
            {
                "id": "p287_ナマケロ-3",
                "name": "つまみぐい寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p287_ナマケロ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p288_ヤルキモノ",
        "dexNumber": 288,
        "name": "ヤルキモノ",
        "type": "ノーマル",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p288_ヤルキモノ-1",
                "name": "ウズウズ寝",
                "rarity": 1
            },
            {
                "id": "p288_ヤルキモノ-2",
                "name": "たいそう寝",
                "rarity": 2
            },
            {
                "id": "p288_ヤルキモノ-3",
                "name": "なまけ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p288_ヤルキモノ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p289_ケッキング",
        "dexNumber": 289,
        "name": "ケッキング",
        "type": "ノーマル",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p289_ケッキング-1",
                "name": "だいのじ寝",
                "rarity": 1
            },
            {
                "id": "p289_ケッキング-2",
                "name": "ぐうたら寝",
                "rarity": 2
            },
            {
                "id": "p289_ケッキング-3",
                "name": "つまみぐい寝",
                "rarity": 3
            },
            {
                "id": "p289_ケッキング-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p302_ヤミラミ",
        "dexNumber": 302,
        "name": "ヤミラミ",
        "type": "あく",
        "sleepType": "うとうと",
        "fields": [
            "トープ洞窟",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p302_ヤミラミ-1",
                "name": "だいのじ寝",
                "rarity": 1
            },
            {
                "id": "p302_ヤミラミ-2",
                "name": "がくがく寝",
                "rarity": 2
            },
            {
                "id": "p302_ヤミラミ-3",
                "name": "ほうせきたべ寝",
                "rarity": 3
            },
            {
                "id": "p302_ヤミラミ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p303_クチート",
        "dexNumber": 303,
        "name": "クチート",
        "type": "はがね",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p303_クチート-1",
                "name": "つっぷし寝",
                "rarity": 1
            },
            {
                "id": "p303_クチート-2",
                "name": "おおあごふり寝",
                "rarity": 2
            },
            {
                "id": "p303_クチート-3",
                "name": "おおあごだき寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p303_クチート-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p304_ココドラ",
        "dexNumber": 304,
        "name": "ココドラ",
        "type": "はがね",
        "sleepType": "ぐっすり",
        "fields": [
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p304_ココドラ-1",
                "name": "かおかき寝",
                "rarity": 1
            },
            {
                "id": "p304_ココドラ-2",
                "name": "ストレッチ寝",
                "rarity": 2
            },
            {
                "id": "p304_ココドラ-3",
                "name": "てつたべ寝",
                "rarity": 3
            },
            {
                "id": "p304_ココドラ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p305_コドラ",
        "dexNumber": 305,
        "name": "コドラ",
        "type": "はがね",
        "sleepType": "ぐっすり",
        "fields": [
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p305_コドラ-1",
                "name": "つっぷし寝",
                "rarity": 1
            },
            {
                "id": "p305_コドラ-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p305_コドラ-3",
                "name": "てつたべ寝",
                "rarity": 3
            },
            {
                "id": "p305_コドラ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p306_ボスゴドラ",
        "dexNumber": 306,
        "name": "ボスゴドラ",
        "type": "はがね",
        "sleepType": "ぐっすり",
        "fields": [
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p306_ボスゴドラ-1",
                "name": "おなかさすり寝",
                "rarity": 1
            },
            {
                "id": "p306_ボスゴドラ-2",
                "name": "におうだち寝",
                "rarity": 2
            },
            {
                "id": "p306_ボスゴドラ-3",
                "name": "てつたべ寝",
                "rarity": 3
            },
            {
                "id": "p306_ボスゴドラ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p311_プラスル",
        "dexNumber": 311,
        "name": "プラスル",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p311_プラスル-1",
                "name": "おだやか寝",
                "rarity": 1
            },
            {
                "id": "p311_プラスル-2",
                "name": "こっくり寝",
                "rarity": 2
            },
            {
                "id": "p311_プラスル-3",
                "name": "ボンボンふり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p311_プラスル-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p312_マイナン",
        "dexNumber": 312,
        "name": "マイナン",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p312_マイナン-1",
                "name": "おだやか寝",
                "rarity": 1
            },
            {
                "id": "p312_マイナン-2",
                "name": "こっくり寝",
                "rarity": 2
            },
            {
                "id": "p312_マイナン-3",
                "name": "ボンボンふり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p312_マイナン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p316_ゴクリン",
        "dexNumber": 316,
        "name": "ゴクリン",
        "type": "どく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ウノハナ雪原"
        ],
        "styles": [
            {
                "id": "p316_ゴクリン-1",
                "name": "ふうせん寝",
                "rarity": 1
            },
            {
                "id": "p316_ゴクリン-2",
                "name": "うなずき寝",
                "rarity": 2
            },
            {
                "id": "p316_ゴクリン-3",
                "name": "おおぐちあけ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p316_ゴクリン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p317_マルノーム",
        "dexNumber": 317,
        "name": "マルノーム",
        "type": "どく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ウノハナ雪原"
        ],
        "styles": [
            {
                "id": "p317_マルノーム-1",
                "name": "のけぞり寝",
                "rarity": 1
            },
            {
                "id": "p317_マルノーム-2",
                "name": "うなずき寝",
                "rarity": 2
            },
            {
                "id": "p317_マルノーム-3",
                "name": "おおぐちあけ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p317_マルノーム-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p328_ナックラー",
        "dexNumber": 328,
        "name": "ナックラー",
        "type": "じめん",
        "sleepType": "ぐっすり",
        "fields": [
            "トープ洞窟",
            "アンバー渓谷"
        ],
        "styles": [
            {
                "id": "p328_ナックラー-1",
                "name": "ぺったり寝",
                "rarity": 1
            },
            {
                "id": "p328_ナックラー-2",
                "name": "ストレッチ寝",
                "rarity": 2
            },
            {
                "id": "p328_ナックラー-3",
                "name": "もぐり寝",
                "rarity": 3
            },
            {
                "id": "p328_ナックラー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p329_ビブラーバ",
        "dexNumber": 329,
        "name": "ビブラーバ",
        "type": "じめん",
        "sleepType": "ぐっすり",
        "fields": [
            "トープ洞窟",
            "アンバー渓谷"
        ],
        "styles": [
            {
                "id": "p329_ビブラーバ-1",
                "name": "はねやすめ寝",
                "rarity": 1
            },
            {
                "id": "p329_ビブラーバ-2",
                "name": "ホバリング寝",
                "rarity": 2
            },
            {
                "id": "p329_ビブラーバ-3",
                "name": "はねこすり寝",
                "rarity": 3
            },
            {
                "id": "p329_ビブラーバ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p330_フライゴン",
        "dexNumber": 330,
        "name": "フライゴン",
        "type": "じめん",
        "sleepType": "ぐっすり",
        "fields": [
            "トープ洞窟",
            "アンバー渓谷"
        ],
        "styles": [
            {
                "id": "p330_フライゴン-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p330_フライゴン-2",
                "name": "はばたき寝",
                "rarity": 2
            },
            {
                "id": "p330_フライゴン-3",
                "name": "おなかだし寝",
                "rarity": 3
            },
            {
                "id": "p330_フライゴン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p333_チルット",
        "dexNumber": 333,
        "name": "チルット",
        "type": "ひこう",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ラピスラズリ湖畔",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p333_チルット-1",
                "name": "はねやすめ寝",
                "rarity": 1
            },
            {
                "id": "p333_チルット-2",
                "name": "ぱたぱた寝",
                "rarity": 2
            },
            {
                "id": "p333_チルット-3",
                "name": "わたぐも寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p333_チルット-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p334_チルタリス",
        "dexNumber": 334,
        "name": "チルタリス",
        "type": "ドラゴン",
        "sleepType": "うとうと",
        "fields": [
            "ウノハナ雪原",
            "ラピスラズリ湖畔",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p334_チルタリス-1",
                "name": "はねうまり寝",
                "rarity": 1
            },
            {
                "id": "p334_チルタリス-2",
                "name": "はねやすめ寝",
                "rarity": 2
            },
            {
                "id": "p334_チルタリス-3",
                "name": "わたぐも寝",
                "rarity": 3
            },
            {
                "id": "p334_チルタリス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p353_カゲボウズ",
        "dexNumber": 353,
        "name": "カゲボウズ",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p353_カゲボウズ-1",
                "name": "ねがえりふゆう寝",
                "rarity": 1
            },
            {
                "id": "p353_カゲボウズ-2",
                "name": "こっくりふゆう寝",
                "rarity": 2
            },
            {
                "id": "p353_カゲボウズ-3",
                "name": "さかさふゆう寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            }
        ]
    },
    {
        "id": "p354_ジュペッタ",
        "dexNumber": 354,
        "name": "ジュペッタ",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p354_ジュペッタ-1",
                "name": "くびひねり寝",
                "rarity": 1
            },
            {
                "id": "p354_ジュペッタ-2",
                "name": "うでふり寝",
                "rarity": 2
            },
            {
                "id": "p354_ジュペッタ-3",
                "name": "おおわらい寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p354_ジュペッタ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p359_アブソル",
        "dexNumber": 359,
        "name": "アブソル",
        "type": "あく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p359_アブソル-1",
                "name": "こうばこずわり寝",
                "rarity": 1
            },
            {
                "id": "p359_アブソル-2",
                "name": "きけんさっち寝",
                "rarity": 2
            },
            {
                "id": "p359_アブソル-3",
                "name": "へそてん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p359_アブソル-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p360_ソーナノ",
        "dexNumber": 360,
        "name": "ソーナノ",
        "type": "エスパー",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p360_ソーナノ-1",
                "name": "しっぽもどし寝",
                "rarity": 1
            },
            {
                "id": "p360_ソーナノ-2",
                "name": "がまん寝",
                "rarity": 2
            },
            {
                "id": "p360_ソーナノ-3",
                "name": "きめポーズ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p360_ソーナノ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p363_タマザラシ",
        "dexNumber": 363,
        "name": "タマザラシ",
        "type": "こおり",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p363_タマザラシ-1",
                "name": "コテン寝",
                "rarity": 1
            },
            {
                "id": "p363_タマザラシ-2",
                "name": "おおあくび寝",
                "rarity": 2
            },
            {
                "id": "p363_タマザラシ-3",
                "name": "てたたき寝",
                "rarity": 3
            },
            {
                "id": "p363_タマザラシ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p364_トドグラー",
        "dexNumber": 364,
        "name": "トドグラー",
        "type": "こおり",
        "sleepType": "ぐっすり",
        "fields": [
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p364_トドグラー-1",
                "name": "あしトントン寝",
                "rarity": 1
            },
            {
                "id": "p364_トドグラー-2",
                "name": "おおあくび寝",
                "rarity": 2
            },
            {
                "id": "p364_トドグラー-3",
                "name": "ひっくりかえり寝",
                "rarity": 3
            },
            {
                "id": "p364_トドグラー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p365_トドゼルガ",
        "dexNumber": 365,
        "name": "トドゼルガ",
        "type": "こおり",
        "sleepType": "ぐっすり",
        "fields": [
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p365_トドゼルガ-1",
                "name": "ぐうたら寝",
                "rarity": 1
            },
            {
                "id": "p365_トドゼルガ-2",
                "name": "かんろく寝",
                "rarity": 2
            },
            {
                "id": "p365_トドゼルガ-3",
                "name": "キバささり寝",
                "rarity": 3
            },
            {
                "id": "p365_トドゼルガ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p371_タツベイ",
        "dexNumber": 371,
        "name": "タツベイ",
        "type": "ドラゴン",
        "sleepType": "うとうと",
        "fields": [
            "アンバー渓谷"
        ],
        "styles": [
            {
                "id": "p371_タツベイ-1",
                "name": "そらとびたい寝",
                "rarity": 1
            },
            {
                "id": "p371_タツベイ-2",
                "name": "おおあくび寝",
                "rarity": 2
            },
            {
                "id": "p371_タツベイ-3",
                "name": "おちたまま寝",
                "rarity": 3
            },
            {
                "id": "p371_タツベイ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p372_コモルー",
        "dexNumber": 372,
        "name": "コモルー",
        "type": "ドラゴン",
        "sleepType": "うとうと",
        "fields": [
            "アンバー渓谷"
        ],
        "styles": [
            {
                "id": "p372_コモルー-1",
                "name": "そらとびたい寝",
                "rarity": 1
            },
            {
                "id": "p372_コモルー-2",
                "name": "のび寝",
                "rarity": 2
            },
            {
                "id": "p372_コモルー-3",
                "name": "ゆめではしり寝",
                "rarity": 3
            },
            {
                "id": "p372_コモルー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p373_ボーマンダ",
        "dexNumber": 373,
        "name": "ボーマンダ",
        "type": "ドラゴン",
        "sleepType": "うとうと",
        "fields": [
            "アンバー渓谷"
        ],
        "styles": [
            {
                "id": "p373_ボーマンダ-1",
                "name": "はばたき寝",
                "rarity": 1
            },
            {
                "id": "p373_ボーマンダ-2",
                "name": "おおあくび寝",
                "rarity": 2
            },
            {
                "id": "p373_ボーマンダ-3",
                "name": "かえんほうしゃ寝",
                "rarity": 3
            },
            {
                "id": "p373_ボーマンダ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p403_コリンク",
        "dexNumber": 403,
        "name": "コリンク",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ゴールド旧発電所"
        ],
        "styles": [
            {
                "id": "p403_コリンク-1",
                "name": "ゆめではしり寝",
                "rarity": 1
            },
            {
                "id": "p403_コリンク-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p403_コリンク-3",
                "name": "スパーク寝",
                "rarity": 3
            },
            {
                "id": "p403_コリンク-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p404_ルクシオ",
        "dexNumber": 404,
        "name": "ルクシオ",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ゴールド旧発電所"
        ],
        "styles": [
            {
                "id": "p404_ルクシオ-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p404_ルクシオ-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p404_ルクシオ-3",
                "name": "スパーク寝",
                "rarity": 3
            },
            {
                "id": "p404_ルクシオ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p405_レントラー",
        "dexNumber": 405,
        "name": "レントラー",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ゴールド旧発電所"
        ],
        "styles": [
            {
                "id": "p405_レントラー-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p405_レントラー-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p405_レントラー-3",
                "name": "スパーク寝",
                "rarity": 3
            },
            {
                "id": "p405_レントラー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p425_フワンテ",
        "dexNumber": 425,
        "name": "フワンテ",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p425_フワンテ-1",
                "name": "かいてん寝",
                "rarity": 1
            },
            {
                "id": "p425_フワンテ-2",
                "name": "ふゆう寝",
                "rarity": 2
            },
            {
                "id": "p425_フワンテ-3",
                "name": "あやし寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            }
        ]
    },
    {
        "id": "p426_フワライド",
        "dexNumber": 426,
        "name": "フワライド",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p426_フワライド-1",
                "name": "だいかいてん寝",
                "rarity": 1
            },
            {
                "id": "p426_フワライド-2",
                "name": "ふゆう寝",
                "rarity": 2
            },
            {
                "id": "p426_フワライド-3",
                "name": "あやし寝",
                "rarity": 3
            }
        ]
    },
    {
        "id": "p430_ドンカラス",
        "dexNumber": 430,
        "name": "ドンカラス",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p430_ドンカラス-1",
                "name": "はづくろい寝",
                "rarity": 1
            },
            {
                "id": "p430_ドンカラス-2",
                "name": "はねやすめ寝",
                "rarity": 2
            },
            {
                "id": "p430_ドンカラス-3",
                "name": "ほうせきまもり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p430_ドンカラス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p438_ウソハチ",
        "dexNumber": 438,
        "name": "ウソハチ",
        "type": "いわ",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p438_ウソハチ-1",
                "name": "こてん寝",
                "rarity": 1
            },
            {
                "id": "p438_ウソハチ-2",
                "name": "ぼうだち寝",
                "rarity": 2
            },
            {
                "id": "p438_ウソハチ-3",
                "name": "めからみず寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p438_ウソハチ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p439_マネネ",
        "dexNumber": 439,
        "name": "マネネ",
        "type": "エスパー",
        "sleepType": "ぐっすり",
        "fields": [
            "シアンの砂浜",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p439_マネネ-1",
                "name": "ばんざい寝",
                "rarity": 1,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p439_マネネ-2",
                "name": "ぼうだち寝",
                "rarity": 2,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p439_マネネ-3",
                "name": "マイムのベッド寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p439_マネネ-4",
                "name": "おなかのうえ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            }
        ]
    },
    {
        "id": "p440_ピンプク",
        "dexNumber": 440,
        "name": "ピンプク",
        "type": "ノーマル",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p440_ピンプク-1",
                "name": "にこにこ寝",
                "rarity": 1
            },
            {
                "id": "p440_ピンプク-2",
                "name": "いしだいじ寝",
                "rarity": 2
            },
            {
                "id": "p440_ピンプク-3",
                "name": "ままごと寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p440_ピンプク-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p442_ミカルゲ",
        "dexNumber": 442,
        "name": "ミカルゲ",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ラピスラズリ湖畔",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p442_ミカルゲ-1",
                "name": "かなめいし寝",
                "rarity": 1
            },
            {
                "id": "p442_ミカルゲ-2",
                "name": "こっくり寝",
                "rarity": 2
            },
            {
                "id": "p442_ミカルゲ-3",
                "name": "じめんぺったり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p442_ミカルゲ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p447_リオル",
        "dexNumber": 447,
        "name": "リオル",
        "type": "かくとう",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "ウノハナ雪原",
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p447_リオル-1",
                "name": "ひざかかえ寝",
                "rarity": 1
            },
            {
                "id": "p447_リオル-2",
                "name": "しゅぎょうちゅう寝",
                "rarity": 2
            },
            {
                "id": "p447_リオル-3",
                "name": "かたひざたて寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p447_リオル-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p448_ルカリオ",
        "dexNumber": 448,
        "name": "ルカリオ",
        "type": "かくとう",
        "sleepType": "ぐっすり",
        "fields": [
            "ウノハナ雪原"
        ],
        "styles": [
            {
                "id": "p448_ルカリオ-1",
                "name": "かたひざたて寝",
                "rarity": 1
            },
            {
                "id": "p448_ルカリオ-2",
                "name": "しゅぎょうちゅう寝",
                "rarity": 2
            },
            {
                "id": "p448_ルカリオ-3",
                "name": "しゅぎょうやすみ寝",
                "rarity": 3
            },
            {
                "id": "p448_ルカリオ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p453_グレッグル",
        "dexNumber": 453,
        "name": "グレッグル",
        "type": "どく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ウノハナ雪原"
        ],
        "styles": [
            {
                "id": "p453_グレッグル-1",
                "name": "ぐうたら寝",
                "rarity": 1
            },
            {
                "id": "p453_グレッグル-2",
                "name": "ほっぺぷくぷく寝",
                "rarity": 2
            },
            {
                "id": "p453_グレッグル-3",
                "name": "せすじのばし寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p453_グレッグル-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p454_ドクロッグ",
        "dexNumber": 454,
        "name": "ドクロッグ",
        "type": "どく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ウノハナ雪原"
        ],
        "styles": [
            {
                "id": "p454_ドクロッグ-1",
                "name": "ぐうたら寝",
                "rarity": 1
            },
            {
                "id": "p454_ドクロッグ-2",
                "name": "のどぷくぷく寝",
                "rarity": 2
            },
            {
                "id": "p454_ドクロッグ-3",
                "name": "どくぶくろまくら寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p454_ドクロッグ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p459_ユキカブリ",
        "dexNumber": 459,
        "name": "ユキカブリ",
        "type": "くさ",
        "sleepType": "ぐっすり",
        "fields": [
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p459_ユキカブリ-1",
                "name": "すわり寝",
                "rarity": 1
            },
            {
                "id": "p459_ユキカブリ-2",
                "name": "ぼうだち寝",
                "rarity": 2
            },
            {
                "id": "p459_ユキカブリ-3",
                "name": "きのみ寝",
                "rarity": 3
            },
            {
                "id": "p459_ユキカブリ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p460_ユキノオー",
        "dexNumber": 460,
        "name": "ユキノオー",
        "type": "くさ",
        "sleepType": "ぐっすり",
        "fields": [
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p460_ユキノオー-1",
                "name": "といき寝",
                "rarity": 1
            },
            {
                "id": "p460_ユキノオー-2",
                "name": "いかく寝",
                "rarity": 2
            },
            {
                "id": "p460_ユキノオー-3",
                "name": "ブリザード寝",
                "rarity": 3
            }
        ]
    },
    {
        "id": "p461_マニューラ",
        "dexNumber": 461,
        "name": "マニューラ",
        "type": "あく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p461_マニューラ-1",
                "name": "すわり寝",
                "rarity": 1
            },
            {
                "id": "p461_マニューラ-2",
                "name": "ちょうはつ寝",
                "rarity": 2
            },
            {
                "id": "p461_マニューラ-3",
                "name": "ぐうたら寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p461_マニューラ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p462_ジバコイル",
        "dexNumber": 462,
        "name": "ジバコイル",
        "type": "はがね",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p462_ジバコイル-1",
                "name": "ゆらゆらふゆう寝",
                "rarity": 1
            },
            {
                "id": "p462_ジバコイル-2",
                "name": "かんしふゆう寝",
                "rarity": 2
            },
            {
                "id": "p462_ジバコイル-3",
                "name": "さかさふゆう寝",
                "rarity": 3
            }
        ]
    },
    {
        "id": "p468_トゲキッス",
        "dexNumber": 468,
        "name": "トゲキッス",
        "type": "フェアリー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島"
        ],
        "styles": [
            {
                "id": "p468_トゲキッス-1",
                "name": "じゆうひこう寝",
                "rarity": 1
            },
            {
                "id": "p468_トゲキッス-2",
                "name": "たちはばたき寝",
                "rarity": 2
            },
            {
                "id": "p468_トゲキッス-3",
                "name": "きょくげいひこう寝",
                "rarity": 3
            },
            {
                "id": "p468_トゲキッス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p470_リーフィア",
        "dexNumber": 470,
        "name": "リーフィア",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p470_リーフィア-1",
                "name": "しっぽをふる寝",
                "rarity": 1
            },
            {
                "id": "p470_リーフィア-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p470_リーフィア-3",
                "name": "はっぱつかみ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p470_リーフィア-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p471_グレイシア",
        "dexNumber": 471,
        "name": "グレイシア",
        "type": "こおり",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p471_グレイシア-1",
                "name": "うでまくら寝",
                "rarity": 1
            },
            {
                "id": "p471_グレイシア-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p471_グレイシア-3",
                "name": "ぺったり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p471_グレイシア-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p475_エルレイド",
        "dexNumber": 475,
        "name": "エルレイド",
        "type": "かくとう",
        "sleepType": "ぐっすり",
        "fields": [
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p475_エルレイド-1",
                "name": "れいぎただしい寝",
                "rarity": 1
            },
            {
                "id": "p475_エルレイド-2",
                "name": "いわいぎり寝",
                "rarity": 2
            },
            {
                "id": "p475_エルレイド-3",
                "name": "ゆめでいあいぎり寝",
                "rarity": 3
            },
            {
                "id": "p475_エルレイド-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p488_クレセリア",
        "dexNumber": 488,
        "name": "クレセリア",
        "type": "エスパー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p488_クレセリア-1",
                "name": "つっぷし寝",
                "rarity": 1
            },
            {
                "id": "p488_クレセリア-2",
                "name": "こっくりふゆう寝",
                "rarity": 2
            },
            {
                "id": "p488_クレセリア-3",
                "name": "みかづきのいのり寝",
                "rarity": 3
            }
        ]
    },
    {
        "id": "p491_ダークライ",
        "dexNumber": 491,
        "name": "ダークライ",
        "type": "あく",
        "sleepType": "うとうと",
        "fields": [
            "イベント限定"
        ],
        "styles": [
            {
                "id": "p491_ダークライ-1",
                "name": "ふゆううでぐみ寝",
                "rarity": 1
            },
            {
                "id": "p491_ダークライ-2",
                "name": "ふゆうかまえ寝",
                "rarity": 2
            },
            {
                "id": "p491_ダークライ-3",
                "name": "ダークホール寝",
                "rarity": 3
            }
        ]
    },
    {
        "id": "p517_ムンナ",
        "dexNumber": 517,
        "name": "ムンナ",
        "type": "エスパー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p517_ムンナ-1",
                "name": "ゆめのけむり寝",
                "rarity": 1
            },
            {
                "id": "p517_ムンナ-2",
                "name": "ふゆうころころ寝",
                "rarity": 2
            },
            {
                "id": "p517_ムンナ-3",
                "name": "ゆめくい寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            }
        ]
    },
    {
        "id": "p518_ムシャーナ",
        "dexNumber": 518,
        "name": "ムシャーナ",
        "type": "エスパー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p518_ムシャーナ-1",
                "name": "ふゆうすりすり寝",
                "rarity": 1
            },
            {
                "id": "p518_ムシャーナ-2",
                "name": "かおごしごし寝",
                "rarity": 2
            },
            {
                "id": "p518_ムシャーナ-3",
                "name": "ゆめのけむり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            }
        ]
    },
    {
        "id": "p557_イシズマイ",
        "dexNumber": 557,
        "name": "イシズマイ",
        "type": "いわ",
        "sleepType": "うとうと",
        "fields": [
            "アンバー渓谷"
        ],
        "styles": [
            {
                "id": "p557_イシズマイ-1",
                "name": "からにこもる寝",
                "rarity": 1
            },
            {
                "id": "p557_イシズマイ-2",
                "name": "こもらない寝",
                "rarity": 2
            },
            {
                "id": "p557_イシズマイ-3",
                "name": "からだいじ寝",
                "rarity": 3
            },
            {
                "id": "p557_イシズマイ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p558_イワパレス",
        "dexNumber": 558,
        "name": "イワパレス",
        "type": "いわ",
        "sleepType": "うとうと",
        "fields": [
            "アンバー渓谷"
        ],
        "styles": [
            {
                "id": "p558_イワパレス-1",
                "name": "からにこもる寝",
                "rarity": 1
            },
            {
                "id": "p558_イワパレス-2",
                "name": "こもらない寝",
                "rarity": 2
            },
            {
                "id": "p558_イワパレス-3",
                "name": "からのうえ寝",
                "rarity": 3
            },
            {
                "id": "p558_イワパレス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p627_ワシボン",
        "dexNumber": 627,
        "name": "ワシボン",
        "type": "ひこう",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p627_ワシボン-1",
                "name": "はねやすめ寝",
                "rarity": 1
            },
            {
                "id": "p627_ワシボン-2",
                "name": "はばたき寝",
                "rarity": 2
            },
            {
                "id": "p627_ワシボン-3",
                "name": "ぐずり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p627_ワシボン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p628_ウォーグル",
        "dexNumber": 628,
        "name": "ウォーグル",
        "type": "ひこう",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p628_ウォーグル-1",
                "name": "はねやすめ寝",
                "rarity": 1
            },
            {
                "id": "p628_ウォーグル-2",
                "name": "はばたき寝",
                "rarity": 2
            },
            {
                "id": "p628_ウォーグル-3",
                "name": "はづくろい寝",
                "rarity": 3
            },
            {
                "id": "p628_ウォーグル-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p700_ニンフィア",
        "dexNumber": 700,
        "name": "ニンフィア",
        "type": "フェアリー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p700_ニンフィア-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p700_ニンフィア-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p700_ニンフィア-3",
                "name": "リボンからまり寝",
                "rarity": 3
            },
            {
                "id": "p700_ニンフィア-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p702_デデンネ",
        "dexNumber": 702,
        "name": "デデンネ",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p702_デデンネ-1",
                "name": "しっぽまるまり寝",
                "rarity": 1
            },
            {
                "id": "p702_デデンネ-2",
                "name": "かおごしごし寝",
                "rarity": 2
            },
            {
                "id": "p702_デデンネ-3",
                "name": "ほっぺすりすり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p702_デデンネ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p710_バケッチャ",
        "dexNumber": 710,
        "name": "バケッチャ",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p710_バケッチャ-1",
                "name": "うまり寝",
                "rarity": 1
            },
            {
                "id": "p710_バケッチャ-2",
                "name": "うかびぱたぱた寝",
                "rarity": 2
            },
            {
                "id": "p710_バケッチャ-3",
                "name": "ひかりてらし寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p710_バケッチャ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p711_パンプジン",
        "dexNumber": 711,
        "name": "パンプジン",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p711_パンプジン-1",
                "name": "だきしめ寝",
                "rarity": 1
            },
            {
                "id": "p711_パンプジン-2",
                "name": "うでひろげ寝",
                "rarity": 2
            },
            {
                "id": "p711_パンプジン-3",
                "name": "おどろかし寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p711_パンプジン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p736_アゴジムシ",
        "dexNumber": 736,
        "name": "アゴジムシ",
        "type": "むし",
        "sleepType": "うとうと",
        "fields": [
            "ゴールド旧発電所"
        ],
        "styles": [
            {
                "id": "p736_アゴジムシ-1",
                "name": "ストレッチ寝",
                "rarity": 1
            },
            {
                "id": "p736_アゴジムシ-2",
                "name": "ゆらゆら寝",
                "rarity": 2
            },
            {
                "id": "p736_アゴジムシ-3",
                "name": "ほりすすみ寝",
                "rarity": 3
            },
            {
                "id": "p736_アゴジムシ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p737_デンジムシ",
        "dexNumber": 737,
        "name": "デンジムシ",
        "type": "むし",
        "sleepType": "うとうと",
        "fields": [
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p737_デンジムシ-1",
                "name": "ストレッチ寝",
                "rarity": 1,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p737_デンジムシ-2",
                "name": "そりかえり寝",
                "rarity": 2,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p737_デンジムシ-3",
                "name": "うまり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p737_デンジムシ-4",
                "name": "おなかのうえ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            }
        ]
    },
    {
        "id": "p738_クワガノン",
        "dexNumber": 738,
        "name": "クワガノン",
        "type": "むし",
        "sleepType": "うとうと",
        "fields": [
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p738_クワガノン-1",
                "name": "かたむき寝",
                "rarity": 1,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p738_クワガノン-2",
                "name": "ホバリング寝",
                "rarity": 2,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p738_クワガノン-3",
                "name": "おはなはつでん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            },
            {
                "id": "p738_クワガノン-4",
                "name": "おなかのうえ寝",
                "rarity": 4,
                "excludeFromFields": [
                    "ワカクサ本島EX"
                ]
            }
        ]
    },
    {
        "id": "p759_ヌイコグマ",
        "dexNumber": 759,
        "name": "ヌイコグマ",
        "type": "かくとう",
        "sleepType": "ぐっすり",
        "fields": [
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p759_ヌイコグマ-1",
                "name": "じたばた寝",
                "rarity": 1
            },
            {
                "id": "p759_ヌイコグマ-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p759_ヌイコグマ-3",
                "name": "まるただき寝",
                "rarity": 3
            },
            {
                "id": "p759_ヌイコグマ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p760_キテルグマ",
        "dexNumber": 760,
        "name": "キテルグマ",
        "type": "かくとう",
        "sleepType": "ぐっすり",
        "fields": [
            "ラピスラズリ湖畔"
        ],
        "styles": [
            {
                "id": "p760_キテルグマ-1",
                "name": "じたばた寝",
                "rarity": 1
            },
            {
                "id": "p760_キテルグマ-2",
                "name": "ぼうだち寝",
                "rarity": 2
            },
            {
                "id": "p760_キテルグマ-3",
                "name": "まるただき寝",
                "rarity": 3
            },
            {
                "id": "p760_キテルグマ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p764_キュワワー",
        "dexNumber": 764,
        "name": "キュワワー",
        "type": "フェアリー",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p764_キュワワー-1",
                "name": "はなすりすり寝",
                "rarity": 1
            },
            {
                "id": "p764_キュワワー-2",
                "name": "こっくりふゆう寝",
                "rarity": 2
            },
            {
                "id": "p764_キュワワー-3",
                "name": "はなウェーブ寝",
                "rarity": 3
            },
            {
                "id": "p764_キュワワー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p778_ミミッキュ",
        "dexNumber": 778,
        "name": "ミミッキュ",
        "type": "ゴースト",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p778_ミミッキュ-1",
                "name": "まるまりたい寝",
                "rarity": 1
            },
            {
                "id": "p778_ミミッキュ-2",
                "name": "ばればれ寝",
                "rarity": 2
            },
            {
                "id": "p778_ミミッキュ-3",
                "name": "まねっこ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p778_ミミッキュ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p845_ウッウ",
        "dexNumber": 845,
        "name": "ウッウ",
        "type": "ひこう",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ウノハナ雪原",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p845_ウッウ-1",
                "name": "はづくろい寝",
                "rarity": 1
            },
            {
                "id": "p845_ウッウ-2",
                "name": "ぱくぱく寝",
                "rarity": 2
            },
            {
                "id": "p845_ウッウ-3",
                "name": "まるのみ寝",
                "rarity": 3
            },
            {
                "id": "p845_ウッウ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p848_エレズン",
        "dexNumber": 848,
        "name": "エレズン",
        "type": "でんき",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p848_エレズン-1",
                "name": "おしゃぶり寝",
                "rarity": 1
            },
            {
                "id": "p848_エレズン-2",
                "name": "のび寝",
                "rarity": 2
            },
            {
                "id": "p848_エレズン-3",
                "name": "だだこ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p848_エレズン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p849_ストリンダー（ハイなすがた）",
        "dexNumber": 849,
        "name": "ストリンダー（ハイなすがた）",
        "type": "でんき",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p849_ストリンダー（ハイなすがた）-1",
                "name": "すわり寝",
                "rarity": 1
            },
            {
                "id": "p849_ストリンダー（ハイなすがた）-2",
                "name": "きめポーズ寝",
                "rarity": 2
            },
            {
                "id": "p849_ストリンダー（ハイなすがた）-3",
                "name": "ゆめでギター寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p849_ストリンダー（ハイなすがた）-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p849_ストリンダー（ローなすがた）",
        "dexNumber": 849,
        "name": "ストリンダー（ローなすがた）",
        "type": "でんき",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ゴールド旧発電所",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p849_ストリンダー（ローなすがた）-1",
                "name": "すわり寝",
                "rarity": 1
            },
            {
                "id": "p849_ストリンダー（ローなすがた）-2",
                "name": "ゆめでベース寝",
                "rarity": 2
            },
            {
                "id": "p849_ストリンダー（ローなすがた）-3",
                "name": "ぐうたら寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p849_ストリンダー（ローなすがた）-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p906_ニャオハ",
        "dexNumber": 906,
        "name": "ニャオハ",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p906_ニャオハ-1",
                "name": "こうばこずわり寝",
                "rarity": 1
            },
            {
                "id": "p906_ニャオハ-2",
                "name": "ふみふみ寝",
                "rarity": 2
            },
            {
                "id": "p906_ニャオハ-3",
                "name": "へそてん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p906_ニャオハ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p907_ニャローテ",
        "dexNumber": 907,
        "name": "ニャローテ",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p907_ニャローテ-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p907_ニャローテ-2",
                "name": "ぼうだち寝",
                "rarity": 2
            },
            {
                "id": "p907_ニャローテ-3",
                "name": "じゃれつく寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p907_ニャローテ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p908_マスカーニャ",
        "dexNumber": 908,
        "name": "マスカーニャ",
        "type": "くさ",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p908_マスカーニャ-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p908_マスカーニャ-2",
                "name": "おじぎ寝",
                "rarity": 2
            },
            {
                "id": "p908_マスカーニャ-3",
                "name": "マジシャン寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p908_マスカーニャ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p909_ホゲータ",
        "dexNumber": 909,
        "name": "ホゲータ",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "トープ洞窟",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p909_ホゲータ-1",
                "name": "はんきゅう寝",
                "rarity": 1
            },
            {
                "id": "p909_ホゲータ-2",
                "name": "もぐもぐ寝",
                "rarity": 2
            },
            {
                "id": "p909_ホゲータ-3",
                "name": "へそてん寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p909_ホゲータ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p910_アチゲータ",
        "dexNumber": 910,
        "name": "アチゲータ",
        "type": "ほのお",
        "sleepType": "すやすや",
        "fields": [
            "シアンの砂浜",
            "トープ洞窟",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p910_アチゲータ-1",
                "name": "はんきゅう寝",
                "rarity": 1
            },
            {
                "id": "p910_アチゲータ-2",
                "name": "るんるん寝",
                "rarity": 2
            },
            {
                "id": "p910_アチゲータ-3",
                "name": "ひだまかかえ寝",
                "rarity": 3
            },
            {
                "id": "p910_アチゲータ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p911_ラウドボーン",
        "dexNumber": 911,
        "name": "ラウドボーン",
        "type": "ほのお",
        "sleepType": "うとうと",
        "fields": [
            "シアンの砂浜",
            "トープ洞窟",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p911_ラウドボーン-1",
                "name": "はんきゅう寝",
                "rarity": 1
            },
            {
                "id": "p911_ラウドボーン-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p911_ラウドボーン-3",
                "name": "なかよし寝",
                "rarity": 3
            },
            {
                "id": "p911_ラウドボーン-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p912_クワッス",
        "dexNumber": 912,
        "name": "クワッス",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "ワカクサ本島",
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p912_クワッス-1",
                "name": "すわり寝",
                "rarity": 1
            },
            {
                "id": "p912_クワッス-2",
                "name": "かみととのえ寝",
                "rarity": 2
            },
            {
                "id": "p912_クワッス-3",
                "name": "ぼさぼさ寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p912_クワッス-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p913_ウェルカモ",
        "dexNumber": 913,
        "name": "ウェルカモ",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p913_ウェルカモ-1",
                "name": "かたひざたて寝",
                "rarity": 1
            },
            {
                "id": "p913_ウェルカモ-2",
                "name": "かみととのえ寝",
                "rarity": 2
            },
            {
                "id": "p913_ウェルカモ-3",
                "name": "みだれがみ寝",
                "rarity": 3
            },
            {
                "id": "p913_ウェルカモ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p914_ウェーニバル",
        "dexNumber": 914,
        "name": "ウェーニバル",
        "type": "みず",
        "sleepType": "ぐっすり",
        "fields": [
            "シアンの砂浜",
            "ラピスラズリ湖畔",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p914_ウェーニバル-1",
                "name": "かたひざたて寝",
                "rarity": 1
            },
            {
                "id": "p914_ウェーニバル-2",
                "name": "きめポーズ寝",
                "rarity": 2
            },
            {
                "id": "p914_ウェーニバル-3",
                "name": "ゆめでダンス寝",
                "rarity": 3
            },
            {
                "id": "p914_ウェーニバル-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p921_パモ",
        "dexNumber": 921,
        "name": "パモ",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ワカクサ本島",
            "ウノハナ雪原",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p921_パモ-1",
                "name": "にくきゅうこすり寝",
                "rarity": 1
            },
            {
                "id": "p921_パモ-2",
                "name": "ふんばり寝",
                "rarity": 2
            },
            {
                "id": "p921_パモ-3",
                "name": "ほっぺすりすり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p921_パモ-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p922_パモット",
        "dexNumber": 922,
        "name": "パモット",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ウノハナ雪原",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p922_パモット-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p922_パモット-2",
                "name": "ゆめでかまえ寝",
                "rarity": 2
            },
            {
                "id": "p922_パモット-3",
                "name": "ほうでん寝",
                "rarity": 3
            },
            {
                "id": "p922_パモット-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p923_パーモット",
        "dexNumber": 923,
        "name": "パーモット",
        "type": "でんき",
        "sleepType": "すやすや",
        "fields": [
            "ウノハナ雪原",
            "ゴールド旧発電所",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p923_パーモット-1",
                "name": "まるまり寝",
                "rarity": 1
            },
            {
                "id": "p923_パーモット-2",
                "name": "ゆめでてあて寝",
                "rarity": 2
            },
            {
                "id": "p923_パーモット-3",
                "name": "ほうでん寝",
                "rarity": 3
            },
            {
                "id": "p923_パーモット-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    },
    {
        "id": "p980_ドオー",
        "dexNumber": 980,
        "name": "ドオー",
        "type": "どく",
        "sleepType": "うとうと",
        "fields": [
            "ワカクサ本島",
            "トープ洞窟",
            "アンバー渓谷",
            "ワカクサ本島EX"
        ],
        "styles": [
            {
                "id": "p980_ドオー-1",
                "name": "おおぐちあけ寝",
                "rarity": 1
            },
            {
                "id": "p980_ドオー-2",
                "name": "ぺったり寝",
                "rarity": 2
            },
            {
                "id": "p980_ドオー-3",
                "name": "どろにうまり寝",
                "rarity": 3,
                "excludeFromFields": [
                    "ワカクサ本島"
                ]
            },
            {
                "id": "p980_ドオー-4",
                "name": "おなかのうえ寝",
                "rarity": 4
            }
        ]
    }
];
