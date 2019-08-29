import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify'
})
export class SlugifyPipe implements PipeTransform {

    transform(value: any): any {
        return this.slugify(value);
    }

    slugify(str) {

        let x1 = str.toLowerCase();
        let x2 = this.removeSpecialChars(x1);
        let x3 = this.replaceSpaces(x2);

        return x3;
    }

    removeSpecialChars(str) {
        return str.replace(/[^a-zA-Z ]/g, "");
    }

    replaceSpaces(str) {
        return str.replace(/ +/g,'-');
    }
    

}
