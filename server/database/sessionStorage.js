// import { Session } from "@shopify/shopify-api/dist/auth/session";
// import fs from "fs";
import MongoSession from "./mongo";

const filename = "./session.json"

export async function storeCallback(session) {
  console.log("storeCallback");
  try{
    const result = await MongoSession.findOne({ id: session.id });
    if (result === null) {
      await MongoSession.create({id: session.id, content: session, shop: session.shop,})
    } else {
      await MongoSession.findOneAndUpdate({ id: session.id },{content: session,shop: session.shop,})
    }
    return true
  } catch(e) {
    console.log(e.message)
  }

  // fs.writeFileSync(filename, JSON.stringify(session));
  // await MongoSession.findOneAndUpdate({shop: session.shop}, session ,{upsert: true}, (err, res) => { if (err) console.log(err) })
}

export async function loadCallback(id) {
  console.log("loadCallback ", id);
  try {
    const result = await MongoSession.findOne({ id });
    if (result.content.id) {
      return result.content;
    } 
  } catch(e) {
    console.log(e.message)
  }
  return undefined;

  // if (fs.existsSync(filename)) {
  //   const sessionResult = fs.readFileSync(filename, "utf8");
  //   return Object.assign(new Session(), JSON.parse(sessionResult));
  // }
}

export async function deleteCallback(id) {
  console.log("deleteCallback", id);
  await MongoSession.deleteMany({ id });
  return true;
}
