<?php

namespace App\Http\Controllers;

use App\Models\Inspiration;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(): Response
    {
        $paginated = Inspiration::query()
            ->where('status', 'publish')
            ->orderBy('id', 'desc')
            ->paginate(9);

        $articles = $paginated->getCollection()->map(fn (Inspiration $i) => [
            'id' => $i->id,
            'title' => $i->title,
            'slug' => $i->slug,
            'excerpt' => $i->excerpt,
            'image' => $i->image,
            'image_url' => $i->image ? '/storage/' . $i->image : null,
        ])->values();

        return Inertia::render('ArticleIndex', [
            'articles' => $articles,
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'total' => $paginated->total(),
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $article = Inspiration::query()
            ->where('slug', $slug)
            ->where('status', 'publish')
            ->firstOrFail();

        $relatedArticles = Inspiration::query()
            ->where('id', '!=', $article->id)
            ->where('status', 'publish')
            ->orderBy('id', 'desc')
            ->take(3)
            ->get()
            ->map(fn (Inspiration $i) => [
                'id' => $i->id,
                'title' => $i->title,
                'slug' => $i->slug,
                'excerpt' => $i->excerpt,
                'image' => $i->image,
                'image_url' => $i->image ? '/storage/' . $i->image : null,
            ]);

        return Inertia::render('ArticleDetail', [
            'article' => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'excerpt' => $article->excerpt,
                'content' => $article->content,
                'image' => $article->image,
                'image_url' => $article->image ? '/storage/' . $article->image : null,
            ],
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
