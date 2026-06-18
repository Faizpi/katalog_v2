<?php

namespace App\Filament\Resources\Products\Schemas;

use App\Models\Category;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                Textarea::make('description')
                    ->rows(3),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('Rp')
                    ->minValue(0),
                \Filament\Forms\Components\Select::make('category_id')
                    ->label('Kategori')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload(),
                FileUpload::make('image')
                    ->label('Gambar Produk')
                    ->disk('public')
                    ->directory('uploads/products')
                    ->image()
                    ->imageEditor()
                    ->maxSize(2048),
                TextInput::make('shopee_link')
                    ->label('Link Shopee')
                    ->maxLength(255),
                TextInput::make('tokopedia_link')
                    ->label('Link Tokopedia')
                    ->maxLength(255),
                TextInput::make('whatsapp')
                    ->label('Nomor WhatsApp')
                    ->maxLength(255),
                \Filament\Forms\Components\Select::make('status')
                    ->options([
                        'publish' => 'Publish',
                        'draft' => 'Draft',
                    ])
                    ->required()
                    ->default('draft'),
                Toggle::make('featured')
                    ->label('Unggulan')
                    ->default(false),
            ]);
    }
}
