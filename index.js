const bands = require("./data/bands");
const connection = require("./config/mongoConnection");

async function main() {
    let ids = [];
    try {
        console.log("Create band one")
        const bandOne = await bands.create("Backstreet Boys", ["Pop", "R&B", "Pop Rock"], "http://www.backstreetboys.com", "RCA", ["Nick Carter", "AJ McLean", "Kevin Richardson", "Brian Littrell", "Howie Dorough"], 1993);
        console.log(bandOne)
        var bandOneId = bandOne._id;
        console.log("\n")
    } catch (error) {
        console.log(error)
    }

    try {
        console.log("Create band two")
        const bandTwo = await bands.create("AC/DC", ["Hard rock", "R&Rock and Roll", "Heavy metal"], "http://www.acdcs.com", "EMI", ["Angus Young", "Phil Rudd", "Cliff Williams", "Brian Johnson", "Stevie Young"], 1973);
        console.log(bandTwo)
        console.log("\n")
    } catch (error) {
        console.log(error)
    }

    try {
        console.log("Get all")
        const bandList = await bands.getAll();
        for (i = 0; i < bandList.length; i++) {
            ids.push(bandList[i]._id);
        }
        console.log(bandList)
        console.log("\n")
    } catch (error) {
        console.log(error)
    }

    try {
        console.log("Create band three")
        const bandThree = await bands.create("Clean Bandit", ["Electronic", "Classic crossover", "Electropop"], "http://www.cleanbandit.com", "Atlantic", ["Grace Chatto", "Milan Neil Amin-Smith", "Jack Patterson", "Luke Patterson"], 2008);
        console.log(bandThree)
        console.log("\n")
    } catch (error) {
        console.log(error)
    }

    try {
        console.log("\n")
        console.log("Rename band one")
        const renameBandOne = await bands.rename(ids[0], "Shweta");
        console.log(renameBandOne)
    } catch (error) {
        console.log(error)
    }

    try {
        console.log("\n")
        console.log("Remove band two")
        const removeBandTwo = await bands.remove(ids[1]);
        console.log(removeBandTwo)
    } catch (error) {
        console.log(error)
    }

    try {
        console.log("\n")
        console.log("Get all")
        const updatedBandList = await bands.getAll();
        console.log(updatedBandList)
    } catch (error) {
        console.log(error)
    }

    try {
        console.log("\n")
        console.log("Create band with bad param")
        const createBadBand = await bands.create("Rock knock", ["Electronic", "Classic crossover", "Electropop"], "http://www.Rockknock.com", "Atlantic", ["Grace Chatto", "Milan Neil Amin-Smith", "Jack Patterson", "Luke Patterson"], 1899);
        console.log(createBadBand)
    } catch (error) {
        console.log(error)
    }

    try {
        console.log("\n")
        console.log("Remove a band that does not exist")
        const removeBandNotPresent = await bands.remove("620cf337bd5e20e425c78b15");
        console.log(removeBandTwo)
    } catch (error) {
        console.log(error)
    }

    try {
        console.log("\n")
        console.log("Rename a band that does not exist")
        const renameBandNotPresent = await bands.rename("620df337bd5e21e425c68b15", "Frontier Boys");
        console.log(renameBandNotPresent)
    } catch (error) {
        console.log(error)
    }

    try {
        console.log("\n")
        console.log("Rename a band passing in invalid data for the newName parameter")
        const invalidInputName = await bands.rename(ids[0   ], "      ");
        console.log(invalidInputName)
    } catch (error) {
        console.log(error)
    }

    try {
        console.log("\n")
        console.log("Getting a band by ID that does not exist")
        const getById = await bands.get("620cf337bd5e20e425c68b15");
        console.log(getById)
    } catch (error) {
        console.log(error)
    }
}

main()
