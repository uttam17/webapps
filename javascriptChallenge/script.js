/*
  In this assignmenmt you are given a list of student names. The challenge
  is to pair students by how similar their names are in edit distance.
  The pairing algorithm  pseudocode is:
  sort the students by last name (A to Z)
  while there is > 1 unpaired student
    X = the first unpaired student
    if X's first name begins with a vowel
      compute the Hamming distance to all other unpaired students
    if X's first name begins with a consonant
      compute the Levenshtein distance to all other unpaired students
    pair X with the most similar name, Y (ie shortest edit distance). If there
    is a tie in edit distance, sort the results by last name (A...Z) and
    take the first.
    remove X and Y from the list of unpaired students.
  to help you, you are provided with the scripts:
    levenshtein.js and hamming.js
  **THERE IS CURRENTLY A NAMING CONFLICT, solve this by wrapping each
    provided distance funciton the JavaScirpt namespace-like construct of your choice.
    YOU CANNOT SIMPLY RENAME the distance functions!
    YOU CANNOT MODIFY THE distance functions IN ANY WAY other than
    to implement your namespace construct!
    I suggest putting each in it's own unique object so in your main
    code you can write:
     hamming.distance(a,b)
      or
     levenshtein.distance(a,b)
 */

var names = ["Jordan Voves", "Keller Chambers", "Stefano Cobelli",
    "Jenna Slusar", "Jason Corriveau", "Cole Whitley", "Dylan Zucker",
    "Danny Toback", "Eric Marshall", "Allan La", "Natalie Altman",
    "Evan Harrington", "Jack Napor", "Jingya Wu", "Christian Ouellette",
    "Junjie Jiang", "Morgan Muller", "Sarah Xu", "Aleksandar Antonov",
    "Parker Watson", "Haipu Sun", "Ryan Pencak", "Dan Kershner",
    "John Venditti", "Jacob Mendelowitz", "Dunni Adenuga", "Jeff Lee",
    "Uttam Kumaran", "Jack Hall-Tipping"
]


/* STEP 1: SORT NAMES by LAST NAME! */

/* function nameCompare: compare two names by last name */
function nameCompare(name1, name2) {
    var name1List = name1.split(" ");
    var name2List = name2.split(" ");

    // Returns two last names
    var lastName1 = name1List[name1List.length - 1];
    var lastName2 = name2List[name2List.length - 1];

    // Compare last names
    if (lastName1 < lastName2) {
        return -1;
    }
    if (lastName1 > lastName2) {
        return 1;
    }
    return 0;
}
// Sort the list
var sortedList = names.sort(nameCompare);
console.log("Sorted Names:");
console.log(sortedList);

/* WHILE > 1 students are UNPAIRED
     take 1st student, compute distance to all others,
      pair with lowest score.
      */

function makePairings(nameList) {
    var levenshtein = new Levenshtein();
    var hamming = new Hamming();
    var pairings = [];
    while (nameList.length > 1) {
        var currName = nameList.shift();
        var minDistance = Infinity;
        var closestIndex = 0;
        if (currName[0] == "A" || currName[0] == "E" || currName[0] == "I" || currName[0] == "O" || currName[0] == "U") {
            for (i = 0; i < nameList.length; i++) {
                var currDistance = hamming.distance(currName, nameList[i])
                if (currDistance < minDistance) {
                    minDistance = currDistance;
                    closestIndex = i;
                }
            }
        } else {
            for (i = 0; i < nameList.length; i++) {
                var currDistance = levenshtein.distance(currName, nameList[i]);
                if (currDistance < minDistance) {
                    minDistance = currDistance;
                    closestIndex = i;
                }
            }
        }
        // Push pair into the list
        pairings.push(currName + " paired with " + nameList[closestIndex]);
        nameList.splice(closestIndex, 1);
    }
    //Push unpaired student at the end
    if (nameList != 0) {
        pairings.push(nameList[0]);
    }
    return (pairings);
}
console.log("Student Pairings:");
var print_paired_list = makePairings(sortedList);
console.log(print_paired_list);
