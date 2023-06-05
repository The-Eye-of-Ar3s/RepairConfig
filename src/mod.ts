import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

import * as config from "../config.json";

class Mod implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void 
    {
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const globals = databaseServer.getTables().globals;
        const repairServer = container.resolve("ConfigServer").configs["aki-repair"];
        repairServer["repairKit"] = config.repairKit;
        globals.config.SkillsSettings.LightVests = config.LightVests;
        globals.config.SkillsSettings.HeavyVests = config.HeavyVests;
        globals.config.SkillsSettings.WeaponTreatment = config.WeaponTreatment;
        
    }
}

module.exports = { mod: new Mod() }