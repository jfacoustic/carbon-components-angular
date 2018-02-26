import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "app-combobox-demo",
	template: `
		<h2 class="p-demo-heading h1">Combo box</h2>

		<h3 class="p-demo-section h2">Single-select</h3>
		<div style="width: 330px;">
			<n-combo-box
				placeholder="Select or enter"
				[items]="demoItems2"
				(selected)="onSelect($event)">
				<n-dropdown-list></n-dropdown-list>
			</n-combo-box>
		</div>

		<h3 class="p-demo-section h2">Multi-select</h3>
		<div style="width: 330px;">
			<n-combo-box
				placeholder="Select or enter"
				type="multi"
				[items]="demoItems3"
				(selected)="onSelect($event)"
				(submit)="onSubmit($event)">
				<n-dropdown-list></n-dropdown-list>
			</n-combo-box>
		</div>

		<h3 class="p-demo-section h2">Ng-Model</h3>
		<h4 class="p-demo-variation h3">Single select</h4>
		<div style="width: 330px">
			<n-combo-box
				placeholder="Select or enter"
				[items]="demoModelItems"
				[(ngModel)]="comboModel1">
				<n-dropdown-list></n-dropdown-list>
			</n-combo-box>
			<p>{{ comboModel1 | json }}</p>
		</div>
		<h4 class="p-demo-variation h3">Multi-select</h4>
		<div style="width: 330px">
			<n-combo-box
				placeholder="Select or enter"
				type="multi"
				[items]="demoModelItems"
				[(ngModel)]="comboModel2">
				<n-dropdown-list></n-dropdown-list>
			</n-combo-box>
			<p>{{ comboModel2 | json }}</p>
		</div>

		<h3 class="p-demo-section h2">Disabled</h3>
		<div style="width: 330px;">
			<n-combo-box
				disabled="true"
				placeholder="Select or enter">
				<n-dropdown-list></n-dropdown-list>
			</n-combo-box>
		</div>

		<h3 class="p-demo-section h2">Internal components</h3>
		<h4 class="p-demo-variation h3">Pill input</h4>
		<div style="display:flex;">
			<n-pill-input
				[pills]="visibleItems1"
				(updatePills)="filterPills()"
				(submit)="demoSubmit($event)"
				type="multi">
			</n-pill-input>
			<button
				class="btn--primary"
				(click)="resetPills()"
				style="margin-left: 10px;">
				Reset
			</button>
		</div>
		<h4 class="p-demo-variation h3">Drop-down list</h4>
		<div style="position: relative; z-index: 1;">
			<div class="dropdown-wrapper">
				<div class="dropdown-menu open" style="position: relative;">
					<n-dropdown-list [items]="demoItems4"></n-dropdown-list>
				</div>
			</div>
		</div>
		<h4 class="p-demo-variation h3">Drop-down multi list</h4>
		<div style="position: relative; z-index: 1;">
			<div class="dropdown-wrapper">
				<div class="dropdown-menu open" style="position: relative;">
					<n-dropdown-list [items]="demoItems4" type="multi"></n-dropdown-list>
				</div>
			</div>
		</div>
	`,
	encapsulation: ViewEncapsulation.None
})
export class ComboboxDemo implements OnInit {
	demoItems1 = [
		{
			content: "Abacus",
			selected: false
		},
		{
			content: "Byte",
			selected: false,
		},
		{
			content: "Computer",
			selected: false
		},
		{
			content: "Digital",
			selected: false
		}
	];
	demoItems2 = Array.from(this.demoItems1, item => Object.assign({}, item));
	demoItems3 = Array.from(this.demoItems1, item => Object.assign({}, item));
	demoItems4 = Array.from(this.demoItems1, item => Object.assign({}, item));
	demoModelItems = Array.from(this.demoItems1, item => Object.assign({}, item));
	comboModel1 = null;
	comboModel2 = null;
	visibleItems1 = this.demoItems1.map(item => { item.selected = true; return item; });

	ngOnInit() {
		this.demoItems1.forEach(item => item.selected = true);
	}

	onSelect(ev) {
		console.log(ev);
	}

	onSubmit(ev) {
		console.log(ev);
		ev.value.selected = true;
		this.demoItems3 = [...ev.items.slice(0, ev.index), ev.value, ...ev.items.slice(ev.index)];
	}

	onClose() {
		console.log("dropdown closed");
	}

	filterPills() {
		console.log(this.visibleItems1, this.demoItems1);
		this.visibleItems1 = this.demoItems1.filter(item => item.selected);
	}

	demoSubmit(ev) {
		console.log(ev);
		let index = this.demoItems1.indexOf(ev.after) + 1;
		this.demoItems1 = [
			...this.demoItems1.slice(0, index),
			{content: ev.value, selected: true},
			...this.demoItems1.slice(index)
		];
		this.visibleItems1 = this.demoItems1.filter(item => item.selected);
	}

	resetPills() {
		this.visibleItems1 = this.demoItems1.map(item => { item.selected = true; return item; });
	}
}
