import Filters from 'filters.js';

export default class View {
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        this.filters = new Filters();

        this.filters.onClick((filters) => this.filters(filters));
    }

    filter(filters){
        const { type, words} = filters;
        const [, ...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows){
            const [title, description, completed] = row.children;
            let shoulHide = false;

            if(words){
                shoulHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }

            console.shouldBeCompleted = type === 'completed' ;
            const isCompleted = completed.children[0].ariaChecked;

            if(type !== 'all' && shouldBeCompleted !== isCompleted){
                shoulHide = true;
            }

            if(shoulHide){
                row.classList.add('d-none');
            } else{
                row.classList.remove('d-none');
            }
        }
    }
}