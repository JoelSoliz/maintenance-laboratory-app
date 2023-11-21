import {getRandomUtility} from './math';

export const generatePolicy1 = ({
  mean,
  deviation,
  costComponent,
  costDisconnect,
  timeDisconnect = 1,
  totalTime = 20000,
}) => {
  let timeNow = 0;
  let eventNum = 1;
  let minTime = 0;
  let componentsName = ['A', 'B', 'C', 'D'];
  let cumulativeCost = 0;
  let component = {
    cost: 0,
    total: 0,
  };
  let disconnection = {
    cost: 0,
    time: 0,
    total: 0,
  };
  const components = Array(4).fill({aliveTime: 0, random: 0});
  let failedComponents = [];

  const events = [];
  while (timeNow + minTime < totalTime) {
    let event = {eventNum};
    if (eventNum === 1) {
      event = {...event, type: 'Inicial', timeNow};
      for (let i = 0; i < 4; i++) {
        let random = Math.random();
        let aliveTime = getRandomUtility(random, mean, deviation);
        components[i] = {aliveTime, random};
        event = {
          ...event,
          [`random${i + 1}`]: random,
          [`aliveTime${i + 1}`]: aliveTime,
        };
      }

      minTime = Math.min(...components.map(component => component.aliveTime));
      event = {...event, failTime: minTime};
      events.push(event);
    } else if (eventNum % 2 === 0) {
      timeNow += minTime;
      event = {...event, type: 'Trabajo', timeNow};
      failedComponents = [];
      for (let i = 0; i < 4; i++) {
        if (components[i].aliveTime === minTime) {
          failedComponents.push(componentsName[i]);
          components[i].aliveTime = 0;
        } else {
          components[i].aliveTime -= minTime;
        }

        event = {...event, [`aliveTime${i + 1}`]: components[i].aliveTime};
      }

      let costDisconnectNow = costDisconnect * timeDisconnect;
      cumulativeCost += costDisconnectNow;
      disconnection = {
        cost: disconnection.cost + costDisconnectNow,
        time: disconnection.time + timeDisconnect,
        total: disconnection.total + 1,
      };
      minTime = 0;
      event = {
        ...event,
        failTime: timeNow,
        failedComponents: failedComponents.join(' '),
        costDisconnect: costDisconnectNow,
        partialCost: costDisconnectNow,
      };
      events.push(event);
    } else {
      timeNow += timeDisconnect;
      event = {...event, type: 'Desconexión', timeNow};
      for (let i = 0; i < 4; i++) {
        if (components[i].aliveTime === 0) {
          let random = Math.random();
          let aliveTime = getRandomUtility(random, mean, deviation);
          components[i] = {aliveTime, random};
          event = {
            ...event,
            [`random${i + 1}`]: random,
            [`aliveTime${i + 1}`]: aliveTime,
          };
        }
      }

      minTime = Math.min(...components.map(component => component.aliveTime));
      let costComponentNow = costComponent * failedComponents.length;
      cumulativeCost += costComponentNow;
      component = {
        cost: component.cost + costComponentNow,
        total: component.total + failedComponents.length,
      };
      event = {
        ...event,
        failTime: minTime,
        costComponent: costComponentNow,
        partialCost: costComponentNow,
      };
      events.push(event);
    }

    eventNum++;
  }
  return {
    totalTime,
    config: {
      mean,
      deviation,
      costComponent,
      costDisconnect,
      timeDisconnect,
      totalTime,
      cumulativeCost,
      type: 1,
    },
    cumulativeCost,
    component,
    disconnection,
    events,
  };
};

export const generatePolicy2 = ({
  mean,
  deviation,
  costComponent,
  costDisconnect,
  timeDisconnect = 2,
  totalTime = 20000,
}) => {
  let timeNow = 0;
  let eventNum = 1;
  let minTime = 0;
  let componentsName = ['A', 'B', 'C', 'D'];
  let cumulativeCost = 0;
  let component = {
    cost: 0,
    total: 0,
  };
  let disconnection = {
    cost: 0,
    time: 0,
    total: 0,
  };
  const components = Array(4).fill({aliveTime: 0, random: 0});
  let failedComponents = [];

  const events = [];
  while (timeNow + minTime < totalTime) {
    let event = {eventNum};
    if (eventNum === 1) {
      event = {...event, type: 'Inicial', timeNow};
      for (let i = 0; i < 4; i++) {
        let random = Math.random();
        let aliveTime = getRandomUtility(random, mean, deviation);
        components[i] = {aliveTime, random};
        event = {
          ...event,
          [`random${i + 1}`]: random,
          [`aliveTime${i + 1}`]: aliveTime,
        };
      }

      minTime = Math.min(...components.map(component => component.aliveTime));
      event = {...event, failTime: minTime};
      events.push(event);
    } else if (eventNum % 2 === 0) {
      timeNow += minTime;
      event = {...event, type: 'Trabajo', timeNow};
      failedComponents = [];
      for (let i = 0; i < 4; i++) {
        if (components[i].aliveTime === minTime) {
          failedComponents.push(componentsName[i]);
          components[i].aliveTime = 0;
        } else {
          components[i].aliveTime -= minTime;
        }

        event = {...event, [`aliveTime${i + 1}`]: components[i].aliveTime};
      }

      let costDisconnectNow = costDisconnect * timeDisconnect;
      cumulativeCost += costDisconnectNow;
      disconnection = {
        cost: disconnection.cost + costDisconnectNow,
        time: disconnection.time + timeDisconnect,
        total: disconnection.total + 1,
      };
      minTime = 0;
      event = {
        ...event,
        failTime: timeNow,
        failedComponents: failedComponents.join(' '),
        costDisconnect: costDisconnectNow,
        partialCost: costDisconnectNow,
      };
      events.push(event);
    } else {
      timeNow += timeDisconnect;
      event = {...event, type: 'Desconexión', timeNow};
      for (let i = 0; i < 4; i++) {
        let random = Math.random();
        let aliveTime = getRandomUtility(random, mean, deviation);
        components[i] = {aliveTime, random};
        event = {
          ...event,
          [`random${i + 1}`]: random,
          [`aliveTime${i + 1}`]: aliveTime,
        };
      }

      minTime = Math.min(...components.map(component => component.aliveTime));
      let costComponentNow = costComponent * components.length;
      cumulativeCost += costComponentNow;
      component = {
        cost: component.cost + costComponentNow,
        total: component.total + components.length,
      };
      event = {
        ...event,
        failTime: minTime,
        costComponent: costComponentNow,
        partialCost: costComponentNow,
      };
      events.push(event);
    }

    eventNum++;
  }

  return {
    totalTime,
    config: {
      mean,
      deviation,
      costComponent,
      costDisconnect,
      timeDisconnect,
      totalTime,
      cumulativeCost,
      type: 2,
    },
    cumulativeCost,
    component,
    disconnection,
    events,
  };
};

export const generateTextResult = (policy1, policy2) => {
  let result = '';
  const [better, worst] =
    policy1.cumulativeCost > policy2.cumulativeCost
      ? [policy2, policy1]
      : [policy1, policy2];
  if (worst.component.cost > worst.disconnection.cost) {
    result += `La causa se debe a que existe una mayor cantidad de componentes reemplazados en la política ${worst.config.type},`;
    result += ` lo cual implica un mayor costo debido a la cantidad de componentes reemplazados.`;
  } else {
    result += `La causa se debe a que existe una mayor cantidad de desconexiones en la política ${worst.config.type},`;
    result += ` lo cual implica un mayor número de horas que el laboratorio se queda sin funcionar.`;
  }

  result += ` Esto genera un costo mayor que el gasto`;

  if (better.component.cost > better.disconnection.cost) {
    result += ` en la compra de componentes en la política ${better.config.type}, `;
    if (better.config.type === 1) {
      result += `donde solo reemplazamos el componente dañado evitando comprar comprar componentes innecesarios.`;
    } else {
      result += `donde reemplazamos todos los componentes tratando de que el tiempo de desconexión sea el menor.`;
    }
  } else {
    result += ` debido al tiempo de desconexión en la política ${better.config.type}, `;
    if (better.config.type === 1) {
      result += `donde realizamos la desconexión de ${better.config.timeDisconnect} [hrs] por cada ocasión que realizamos el reemplazo de los componentes dañados unicamente.`;
    } else {
      result += `donde realizamos la desconexión de ${better.config.timeDisconnect} [hrs] por cada ocasión que realizamos el reemplazo de todos los componentes a la vez.`;
    }
  }

  return result;
};
