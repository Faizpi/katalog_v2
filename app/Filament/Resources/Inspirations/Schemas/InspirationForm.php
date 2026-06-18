<?php

namespace App\Filament\Resources\Inspirations\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;

class InspirationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                Textarea::make('excerpt')
                    ->rows(2),
                RichEditor::make('content')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->label('Gambar Artikel')
                    ->directory('uploads/articles')
                    ->image()
                    ->imageEditor()
                    ->maxSize(2048),
                \Filament\Forms\Components\Select::make('status')
                    ->options([
                        'publish' => 'Publish',
                        'draft' => 'Draft',
                    ])
                    ->required()
                    ->default('draft'),
            ]);
    }
}
