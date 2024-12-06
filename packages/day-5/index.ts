export type Rule = {
  value: number,
  peer: number,
  context: (selfIndex: number, peerIndex: number) => boolean,
};

export const parseData = (data: string[]) => {
  const ruleMatcher = /\d+\|\d+/;
  const scenarioMatcher = /(\d+,)+\d/;
  const rules:Map<number, Rule[]> = new Map();
  const scenarios:number[][] = [];

  data.forEach((line) => {
    if (ruleMatcher.test(line)) {
      const [arg1, arg2] = line.split('|').map((text) => {
        const num = Number.parseInt(text);
        if (isNaN(num)) {
          throw `Invalid input: Expected ${text} of ${line} to be a number`;
        }
        return num;
      });

      let ruleList = rules.get(arg1);
      if (ruleList == null) {
        ruleList = [];
        rules.set(arg1, ruleList);
      }
      ruleList.push(
        {
          value: arg1,
          peer: arg2,
          context: function(i, j) {
            return i < j;
          },
        }
      );
    }
    else if (scenarioMatcher.test(line)) {
      scenarios.push(line.split(',').map((text) => {
        const num = Number.parseInt(text);
        if (isNaN(num)) {
          throw `Invalid input: Expected ${text} of ${line} to be a number`;
        }
        return num;
      }));
    }
  });

  return {
    rules,
    scenarios,
  };
};

export const doesDataFitRules = (data: number[], rules: Map<number, Rule[]>) => {
  return data.every((item, index) => {
    const applicableRules = rules.get(item) || [];
    return applicableRules.every((rule) => {
      const peerIndex = data.indexOf(rule.peer);
      if (peerIndex === -1) {
        return true;
      }
      return rule.context(index, peerIndex);
    });
  });
};

export const reorderToFitRules = (data: number[], rules: Map<number, Rule[]>) => {
  return data.sort((value1, value2) => {
    const applicableRules = rules.get(value1) || [];
    const rule = applicableRules.find((rule) => rule.peer === value2);
    if (!rule) {
      return 0;
    }
    else {
      return -1;
    }
  });
};

export const getMiddleValue = (data: number[]) => {
  const midPoint = (data.length - 1) / 2;
  return data[midPoint];
};
