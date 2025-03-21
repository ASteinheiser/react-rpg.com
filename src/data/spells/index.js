import Fireball from './fireball';
import Mend from './mend';
import IceShard from './ice-shard';
import PoisonDart from './poison-dart';
import LightningBolt from './lightning-bolt';
import Void from './void';
import Blizzard from './blizzard';
import Meteor from './meteor';
import Heal from './heal';
import Frighten from './frighten';
import PoisonCloud from './poison-cloud';
import ThunderStorm from './thunder-storm';

const spells = [
    Mend,
    Fireball,
    IceShard,
    PoisonDart,
    LightningBolt,
    Void,
    Blizzard,
    Meteor,
    Heal,
    Frighten,
    PoisonCloud,
    ThunderStorm,
].sort((left, right) => left.unlockLevel - right.unlockLevel);

export default spells;
