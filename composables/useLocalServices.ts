import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { serviceItems } from '~/data/services'

const arabicTitles = ["التأهيل العصبي","التأهيل بالهيكل الخارجي الروبوتي","العلاج الوظيفي","تأهيل العظام والعمود الفقري","رعاية صحة المرأة","تأهيل الأطفال","التكامل الحسي","تنمية التواصل والمهارات","تعديل السلوك","التغذية العلاجية والرياضية"]
const arabicDescriptions = ["رعاية دقيقة لآلام المفاصل وإصابات الجهاز العضلي الهيكلي.","دعم استعادة الحركة وتحسين الأداء باستخدام تقنيات التأهيل الروبوتي.","دعم الاستقلالية واستعادة المهارات اللازمة للأنشطة اليومية.","برامج لتحسين الحركة ووظائف العمود الفقري والمفاصل.","رعاية فردية لصحة المرأة والحركة ووظائف قاع الحوض.","دعم التوازن والتناسق والتطور الحركي للأطفال.","دعم معالجة المدخلات الحسية والتناسق والوعي بالجسم.","برامج لدعم التواصل والثقة وتنمية المهارات اليومية.","دعم تطوير السلوك والمهارات والتفاعل اليومي.","برامج تغذية لدعم الصحة والأداء الرياضي."]
const images = import.meta.glob('~/assets/img/*', { eager: true, import: 'default' }) as Record<string, string>

export function useLocalServices() {
  const { locale, t, te, tm } = useI18n({ useScope: 'global' })
  return computed(() => serviceItems.map((item, index) => {
    const prefix = 'services.' + item.id
    const translated = (field: string, fallback: string) => te(prefix + '.' + field) ? t(prefix + '.' + field) : fallback
    const list = (field: string, fallback: string[]) => {
      const value = te(prefix + '.' + field) ? tm(prefix + '.' + field) : fallback
      return Array.isArray(value) ? value : fallback
    }
    const arabic = locale.value === 'ar'
    return {
      ...item,
      slug: item.id,
      title: translated('title', arabic ? arabicTitles[index] : item.title),
      description: translated('shortDescription', arabic ? arabicDescriptions[index] : item.shortDescription),
      imageUrl: images['/assets/img/' + item.image],
      overview: list('overview', arabic ? [] : item.overview),
      audience: list('audience', arabic ? [] : item.audience),
      outcomes: list('outcomes', arabic ? [] : item.outcomes),
      duration: translated('duration', arabic ? '' : item.duration),
      durationNote: translated('durationNote', arabic ? '' : item.durationNote)
    }
  }))
}
