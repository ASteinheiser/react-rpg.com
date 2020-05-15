import Fireball from './fireball';
import Mend from './mend';
import IceShard from './ice-shard';
import PoisonDart from './poison-dart';
import LightningBolt from './lightning-bolt';
import Void from './void';

const spells = [Mend, Fireball, IceShard, PoisonDart, LightningBolt, Void].sort(
    (left, right) => left.unlockLevel - right.unlockLevel
);

export default spells;
