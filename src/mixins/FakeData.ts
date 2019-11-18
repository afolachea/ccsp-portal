export default class FakeData {
  static data: Entry[] = [];

  area = "Centro";
  numUsers = 10;
  entries: Entry[] = [];
  users: User[] = [];

  generate() {
    let date = new Date(2019, 0, 1);

    this.users = [...Array(this.numUsers)].map((_, i) => {
      return {
        id: i + 1,
        behavior: {
          engagement: this.randn_bm(0, 5, 1),
          probWrongData: this.randn_bm(0, 1, 5),
        }
      } as User;
    });

    let pressureIndex = Math.floor(Math.random() * 4);
    let spanDuration = Math.floor(this.randn_bm(1, 16, 1));
    let hour = 0;

    // console.log(date, pressureIndex, spanDuration, hour);

    while (date.getFullYear() === 2019) {

      if (spanDuration === 0) {
        pressureIndex = Math.floor(Math.random() * 4);
        spanDuration = Math.floor(this.randn_bm(1, 16, 1));
        
        // console.log(pressureIndex);
      }

      if (hour === 0) {
        this.users.forEach(user => {
          user.behavior.entryTimes = this.getRandomValues(Math.floor(user.behavior.engagement), 0, 23)
        })
        // console.log(this.users);
      }
      
      while (spanDuration > 0 && hour < 24) {
        // console.log(spanDuration, hour);

        const datetime = {
          year: 2019,
          month: date.getMonth() + 1,
          day: date.getDate(),
          hour: hour,
          minutes: 0,
        }

        this.users.forEach(user => {
          if (user.behavior.entryTimes.some(x => x === hour)) {
            const wrong = this.randn_bm(0, 1, 1) < user.behavior.probWrongData;
            const pressure = wrong ? Math.floor(Math.random() * 4) : pressureIndex;

            this.entries.push({
              user,
              datetime,
              pressure,
            });
          }
        })

        spanDuration--;
        hour++;
      }

      if (hour === 24) {
        date = new Date(date.setDate(date.getDate() + 1));
        hour = 0;
        
        // console.log(date);
      }
    }

    FakeData.data = this.entries;
  }

  // generates random number with normal distribution
  private randn_bm(min: number, max: number, skew: number) {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = this.randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
  }

  private getRandomValues(amount: number, min: number, max: number) {
    return [...Array(amount)].map(() => Math.floor(Math.random() * (max - min + 1)) + min);
  }
}


interface Entry {
  datetime: {
    year: number,
    month: number,
    day: number,
    hour: number,
    minutes: number,
  },
  pressure: number,
  user: User,
}

interface User {
  id: number;
  behavior: {
    engagement: number,
    probWrongData: number,
    entryTimes: number[],
  }
}