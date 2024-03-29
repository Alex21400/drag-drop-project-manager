import { Component } from "./base-components";
import { Autobind } from "../decorators/autobind";
import { validate, Validatable } from "../utils/validation";
import { projectState } from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
    }

    private gatherUserInfo(): [string, string, number] | void{
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const people = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: title,
            required: true
        };

        const descriptionValidatable: Validatable = {
            value: description,
            required: true,
            minLength: 10
        }

        const peopleValidatable: Validatable = {
            value: +people,
            required: true,
            min: 1,
            max: 5
        }

        if(
            !validate(titleValidatable) &&
            !validate(descriptionValidatable) &&
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
        }

        return [title, description, +people];
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @Autobind
    private handleSubmit(e: Event) {
        e.preventDefault();
        const input = this.gatherUserInfo();

        if(Array.isArray(input)) {
            const [title, description, people] = input;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }

    configure() {
        this.element.addEventListener('submit', this.handleSubmit)
    }

    renderContent() {}
}