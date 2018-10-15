export function sortCondition(a, b) {
    const {sortDirect} = this.appState$;

    if (sortDirect==='asc')
        return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
    if (sortDirect==='desc')
        return a.label < b.label ? 1 : a.label > b.label ? -1 : 0;
    return 0;    
}
