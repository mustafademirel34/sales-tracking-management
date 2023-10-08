import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  editForm!: FormGroup;
  editingRowIndex: number = -1; // editingRowIndex özelliğini tanımladık

  ngOnInit(): void {
    this.filteredTableData = this.productData;
    this.createEditForm();
  }

  searchText: string = '';

  productData: Product[] = [
    {
      productId: 1,
      productName: 'Koltuk',
      productCategory: 'Mobilya',
      productAmount: 20,
      productPrice: 500,
      productHome: 'Depo A'
    },
    {
      productId: 2,
      productName: 'Televizyon',
      productCategory: 'Elektronik',
      productAmount: 10,
      productPrice: 2000,
      productHome: 'Depo B'
    },
    {
      productId: 3,
      productName: 'Masa',
      productCategory: 'Mobilya',
      productAmount: 15,
      productPrice: 300,
      productHome: 'Depo C'
    },
    {
      productId: 4,
      productName: 'Cep Telefonu',
      productCategory: 'Elektronik',
      productAmount: 8,
      productPrice: 1500,
      productHome: 'Depo A'
    },
    {
      productId: 5,
      productName: 'Laptop',
      productCategory: 'Elektronik',
      productAmount: 5,
      productPrice: 2500,
      productHome: 'Depo B'
    },
    {
      productId: 6,
      productName: 'Yatak',
      productCategory: 'Mobilya',
      productAmount: 12,
      productPrice: 800,
      productHome: 'Depo C'
    },
    {
      productId: 7,
      productName: 'Bisiklet',
      productCategory: 'Spor',
      productAmount: 3,
      productPrice: 600,
      productHome: 'Depo A'
    },
    {
      productId: 8,
      productName: 'Kamera',
      productCategory: 'Elektronik',
      productAmount: 6,
      productPrice: 1200,
      productHome: 'Depo B'
    },
    {
      productId: 9,
      productName: 'Kanepe',
      productCategory: 'Mobilya',
      productAmount: 18,
      productPrice: 1000,
      productHome: 'Depo C'
    },
    {
      productId: 10,
      productName: 'Saat',
      productCategory: 'Aksesuar',
      productAmount: 7,
      productPrice: 300,
      productHome: 'Depo A'
    }
  ];
  

  filteredTableData: Product[] = [];
// Kategori ve depo seçenekleri
categoryOptions: string[] = ['Aksesuar', 'Spor', 'Mobilya','Elektronik'];
homeOptions: string[] = ['Depo A', 'Depo B', 'Depo C'];

// Filtreleme değişkenleri
selectedCategory: string = '';
selectedHome: string = '';
priceRange: { min: number, max: number } = { min: 0, max: 0 };
amountRange: { min: number, max: number } = { min: 0, max: 0 };

filterTableData(): void {
  this.filteredTableData = this.productData.filter((item: Product) =>
    (item.productName.toLowerCase().includes(this.searchText.toLowerCase()) || !this.searchText) &&
    (item.productCategory === this.selectedCategory || !this.selectedCategory) &&
    (item.productHome === this.selectedHome || !this.selectedHome) &&
    (item.productPrice >= this.priceRange.min || this.priceRange.min === 0) &&
    (item.productPrice <= this.priceRange.max || this.priceRange.max === 0) &&
    (item.productAmount >= this.amountRange.min || this.amountRange.min === 0) &&
    (item.productAmount <= this.amountRange.max || this.amountRange.max === 0)
  );
}

clearFilters(): void {
  this.searchText = '';
  this.selectedCategory = '';
  this.selectedHome = '';
  this.priceRange = { min: 0, max: 0 };
  this.amountRange = { min: 0, max: 0 };
  this.filteredTableData = this.productData;
}

  

  createEditForm(): void {
    this.editForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      productAmount: ['', Validators.required],
      productPrice: ['', Validators.required],
      productHome: ['', Validators.required]
    });
  }

  isEditing(index: number): boolean {
    return this.editingRowIndex === index;
  }

  editProduct(index: number): void {
    this.ilgiliDuzenle=index;
    this.editingRowIndex = index;
    const product = this.filteredTableData[index];
    this.editForm.patchValue(product);
  }

  ilgiliDuzenle:number=0;

saveChanges(index: number): void {
  if (this.editForm.valid) {
    const updatedProduct = {
      ...this.editForm.value,
      productId: this.filteredTableData[index].productId
    };
    this.filteredTableData[index] = updatedProduct;
    this.editingRowIndex = -1;
    this.editForm.reset();
  }
}


  cancelEditing(index: number): void {
    this.editingRowIndex = -1;
    this.editForm.reset();
  }

  constructor(private formBuilder: FormBuilder,
    private router:Router) { }

  AnasayfayaGit(){
    this.router.navigate(['home'], { });
  }

  
  

}
