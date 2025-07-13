var fs = require("fs");



const JSONData = {
    data: []
}

const group = [
    // {
    //     label: '卡通',
    //     value: '',
    //     start: 460,
    //     end: 489
    // },
    {
        label: '자켓',
        value: 'jackets',
        start: 0,
        end: 49
    },
    {
        label: '바지',
        value: 'pants',
        start: 50,
        end: 99
    },
    {
        label: '셔츠',
        value: 'seasons',
        start: 100,
        end: 149
    },
    {
        label: '코트',
        value: 'eletronics',
        start: 150,
        end: 199
    },
    // {
    //     label: '水果',
    //     value: '',
    //     start: 76,
    //     end: 89
    // },
    // {
    //     label: '衣服',
    //     value: '',
    //     start: 89,
    //     end: 136
    // },
    {
        label: '학고(하꼬)',
        value: 'flags',
        start: 200,
        end: 249
    },
    {
        label: '주머니',
        value: 'threes',
        start: 250,
        end: 299
    },
    {
        label: '부자재',
        value: 'food',
        start: 300,
        end: 349
    },
    {
        label: '트임',
        value: 'clothes',
        start: 350,
        end: 399
    },
    
]



const baseUrl = 'https://moonhyukkim.github.io/portfolio/images/svg/'
JSONData.data = group.map((item, i) => {
    const list = []
    for (let index = item.start; index < item.end; index++) {
        list.push({
            "label": item.label + index,
            "value": i + '-' + index,
            "tempUrl": baseUrl + index + ".svg",
            "src": baseUrl + index + ".svg"
        })
    }
    return {
        label: item.label,
        value: item.value,
        list
    }
})

fs.writeFile('type.json', JSON.stringify(JSONData), function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('저장 성공')
});