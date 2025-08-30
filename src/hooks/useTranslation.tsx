import { useState, useCallback } from "react"

interface TranslationCache {
  [key: string]: { [targetLang: string]: string }
}

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [translationCache, setTranslationCache] = useState<TranslationCache>({})
  const [isTranslating, setIsTranslating] = useState(false)

  const translateText = useCallback(async (text: string, targetLang: string): Promise<string> => {
    if (targetLang === "en" || !text.trim()) return text
    
    // Check cache first
    const cacheKey = text.toLowerCase().trim()
    if (translationCache[cacheKey]?.[targetLang]) {
      return translationCache[cacheKey][targetLang]
    }

    setIsTranslating(true)
    
    try {
      // For demo purposes, we'll use a mock translation
      // In production, you would integrate with Google Translate API via Supabase Edge Function
      const mockTranslation = `[${targetLang.toUpperCase()}] ${text}`
      
      // Cache the translation
      setTranslationCache(prev => ({
        ...prev,
        [cacheKey]: {
          ...prev[cacheKey],
          [targetLang]: mockTranslation
        }
      }))
      
      return mockTranslation
    } catch (error) {
      console.error("Translation error:", error)
      return text // Return original text on error
    } finally {
      setIsTranslating(false)
    }
  }, [translationCache])

  const translateArticle = useCallback(async (article: any, targetLang: string) => {
    if (targetLang === "en") return article

    return {
      ...article,
      title: await translateText(article.title, targetLang),
      description: await translateText(article.description, targetLang),
      content: await translateText(article.content || "", targetLang)
    }
  }, [translateText])

  return {
    currentLanguage,
    setCurrentLanguage,
    translateText,
    translateArticle,
    isTranslating
  }
}