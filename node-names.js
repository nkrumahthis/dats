const data = {
    "adjectives": [
        "brilliant", "curious", "dynamic", "eager", "fearless", "gentle", "happy", "insightful", "jovial", "keen",
        "logical", "meticulous", "nimble", "observant", "patient", "quick", "reliable", "smart", "thoughtful", "unique",
        "valiant", "witty", "youthful", "zealous", "astute", "bold", "clever", "daring", "elegant", "fierce",
        "graceful", "honest", "intuitive", "jubilant", "knowledgeable", "lively", "mighty", "noble", "optimistic", "practical",
        "quiet", "resilient", "sincere", "talented", "upbeat", "vibrant", "wise", "zesty", "adaptable", "brave",
        "capable", "diplomatic", "earnest", "focused", "gallant", "humble", "imaginative", "joyful", "kindhearted", "lucid",
        "motivated", "nurturing", "open-minded", "perceptive", "quick-witted", "resourceful", "supportive", "trustworthy", "understanding", "versatile",
        "warmhearted", "brazen", "zany", "ambitious", "brisk", "courageous", "decisive", "empathetic", "forgiving", "gritty",
        "heroic", "industrious", "jolly", "knowledgable", "likable", "methodical", "neutral", "outgoing", "polite", "respectful",
        "sociable", "tenacious", "uplifting", "vigilant", "wholesome", "yielding", "rambunctious", "articulate", "cheerful", "devoted"
    ],
    "names": [
        "rockefeller", "ford", "vanderbilt", "carnegie", "morgan", "gates", "buffett", "bezos", "zuckerberg", "jobs",
        "page", "brin", "musk", "walton", "kochs", "disney", "chanel", "prada", "pinault", "arnault",
        "orso", "forde", "ballmer", "kroc", "schwab", "khosrowshahi", "benioff", "dell", "perez", "murdock",
        "bloomberg", "schultz", "branson", "ellison", "koch", "simons", "jones", "soros", "ikea", "tata",
        "ambani", "bhargava", "kamprad", "balmer", "klein", "wynn", "buffet", "birla", "aiken", "sainsbury",
        "charoen", "nadar", "dong", "li", "wang", "cho", "lim", "kam", "oh", "kwok",
        "pao", "mackenzie", "woodruff", "hershey", "plank", "holmes", "newhouse", "freud", "lazare", "brandt",
        "reuters", "lehman", "oppenheim", "kuhn", "goldman", "sachs", "harriman", "kravis", "perot", "lowy",
        "saatchi", "putin", "bosch", "jardine", "adams", "wright", "magnus", "lawrence", "agyepong", "ling",
        "dangote", "motsepe", "elumelu", "adesina", "masiyiwa", "thakkar", "mawati", "nduom", "jah", "ophir"
    ]
}

const uniqueAdjective = {}
for (const adj of data.names) {
    if (!uniqueAdjective[adj]) {
        uniqueAdjective[adj] = true
    } else {
        // remove duplicate adjective
        console.log(adj, "is repeated")
    }
}

// function to generate a unique node name using a random combination of adjectives and names
function generateNodeName() {
    // random number from 0 to 100
    const randomAdjective = Math.floor(Math.random() * 100)
    const randomName = Math.floor(Math.random() * 100)

    // return the name from the corresponding index
    return `${data.adjectives[randomAdjective]} ${data.names[randomName]}`
}

console.log(generateNodeName())