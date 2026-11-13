export function suggestPriority(description=''){
  const text=String(description).toLowerCase();
  const urgent=['fire','sparks','smoke','medical emergency','security threat'];
  const high=['water leakage','structural damage','electrical fault','broken'];
  if(urgent.some(term=>text.includes(term)))return {priority:'URGENT',reason:'Potential immediate safety risk detected'};
  if(high.some(term=>text.includes(term)))return {priority:'HIGH',reason:'Potential significant service disruption detected'};
  if(/slow|intermittent|not working/.test(text))return {priority:'MEDIUM',reason:'Service disruption keyword detected'};
  return {priority:'LOW',reason:'No elevated-risk keyword detected'};
}
