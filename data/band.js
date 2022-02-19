const mongoCollections = require("../config/mongoCollections");
const bands = mongoCollections.bands;
let { ObjectId } = require('mongodb');

module.exports = {
    async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
        if ((!name || name == undefined || name == null) && (!genre || genre == undefined || genre == null) && (!website || website == undefined || website == null) && (!recordLabel || recordLabel == undefined || recordLabel == null) && (!bandMembers || bandMembers == undefined || bandMembers == null) && (!yearFormed || yearFormed == undefined || yearFormed == null)) {
            throw "Error: All fields need to have proper value"
        }

        if (!name || typeof (name) != "string" || !name.trim() || name.length == 0) {
            throw "Error: Enter valid name"
        }

        if (!website || typeof (website) != "string" || !website.trim() || website.length == 0) {
            throw "Error: Enter valid website"
        }

        if (!recordLabel || typeof (recordLabel) != "string" || !recordLabel.trim() || website.length == 0) {
            throw "Error: Enter valid record label "
        }

        let reg = RegExp(/^http:\/\/www\.\w{5,}\.com/);
        if (reg.test(website) != true) {
            throw "Error: Enter valid website"
        }

        if (!Array.isArray(genre) || genre.length == 0) {
            throw "Error: Enter valid genre"
        }

        genre.forEach(element => {
            if (typeof (element) != "string") {
                throw "Error: Enter valid genre"
            }

            if (element.trim().length == 0) {
                throw "Error: Enter valid genre"
            }
        });

        if (!Array.isArray(bandMembers) || bandMembers.length == 0) {
            throw "Error: Enter valid genre"
        }

        bandMembers.forEach(element => {
            if (typeof (element) != "string") {
                throw "Error: Enter valid band memeber"
            }

            if (element.trim().length == 0) {
                throw "Error: Enter valid band member"
            }
        });

        if (typeof (yearFormed) != "number" || yearFormed < 1900 || yearFormed > 2022) {
            throw "Error: Enter valid year formed data"
        } else {
            const bandsCollection = await bands();

            let newBand = {
                name: name,
                genre: genre,
                website: website,
                recordLabel: recordLabel,
                bandMembers: bandMembers,
                yearFormed: yearFormed
            };

            const createBand = await bandsCollection.insertOne(newBand);

            if (createBand.insertedCount == 0) {
                throw "Error: Could not create band"
            }

            const newId = createBand.insertedId;
            return await bandsCollection.findOne({ _id: newId });
        }
    },

    async getAll() {
        const bandsCollection = await bands();
        const allBands = await bandsCollection.find({}).toArray();

        for (let i = 0; i < allBands.length; i++) {
            let ids = allBands[i]._id.toString();
            allBands[i]._id = ids;
        }
        return allBands;
    },

    async get(id) {

        if (!id || id == undefined || !ObjectId.isValid(id) || typeof (id) != "string" || !id.trim()) {
            throw "Error: Enter valid ID"
        } else {
            const bandsCollection = await bands();
            const bandsId = await bandsCollection.findOne({ _id: ObjectId(id) });
            if (bandsId == null) {
                throw "Error: No band with this ID was found"
            }
            return bandsId;
        }
    },

    async remove(id) {
        if (!id || id == undefined || !ObjectId.isValid(id) || typeof (id) != "string" || !id.trim()) {
            throw "Error: Enter valid ID"
        } else {
            const bandsCollection = await bands();
            const remove = await bandsCollection.findOne({ _id: ObjectId(id) });
            if (remove == null) {
                throw "Error: No band with this ID exists"
            }
            const bandRemoved = await bandsCollection.deleteOne({ _id: ObjectId(id) });
            return "The " + remove.name + " has been successfully deleted!";
        }
    },

    async rename(id, newName) {
        if (!id || id == undefined || !ObjectId.isValid(id) || typeof (id) != "string" || id.trim().length == 0) {
            throw "Error: Enter valid ID"
        }

        if (!newName || !newName.trim() || typeof (newName) != "string" || newName.length == 0) {
            throw "Error: Enter valid new name"
        } else {
            const bandsCollection = await bands();
            const resetBandId = await bandsCollection.findOne({ _id: ObjectId(id) });
            if (resetBandId == null) {
                throw "Error: No band with this ID exists"
            }
            if(newName == resetBandId.name){
                throw "Error: New name cannot be same as existing name"
            }
            const renameBand = await bandsCollection.updateOne({ _id: ObjectId(id) }, { $set: { name: newName } });
            return await this.get(id);
        }
    }
}
