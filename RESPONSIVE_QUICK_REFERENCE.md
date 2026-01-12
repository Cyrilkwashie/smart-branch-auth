# Responsive Design Quick Reference

## Component Updates at a Glance

### AppHeader

**Mobile** (< 640px)
```
┌─────────────────────────┐
│ ☰ | [Small Header]  ◐  │ h=64px
└─────────────────────────┘
```

**Tablet+** (≥ 640px)
```
┌──────────────────────────────┐
│ ☰ | [Dashboard Overview] ◐   │ h=80px
└──────────────────────────────┘
```

**Key Changes:**
- Height: `h-16 → sm:h-20`
- Padding: `px-3 → sm:px-6`
- Icons: `h-4 w-4 → sm:h-5 sm:w-5`
- Title hidden on mobile: `hidden sm:flex`

---

### AppSidebar

**Mobile** (Collapsed by default)
```
┌──┐
│☰ │ Width: ~50px
│◎│
│  │
└──┘
```

**Tablet+** (Expanded)
```
┌─────────────────┐
│ ☰ Smart Branch  │ Width: ~260px
│───────────────│
│ ◎ Dashboard    │ h-10
│ 👥 Customers   │ h-10
│ ➕ Account...  │ h-10
└─────────────────┘
```

**Key Changes:**
- Menu height: `h-9 → sm:h-10`
- Text sizes: `text-sm → sm:text-base`
- Icon sizing: responsive across all items
- Proper truncation: prevents text overflow

---

### Dashboard Layout

**Mobile** (Single Column)
```
┌─────────────┐
│ Profile     │
├─────────────┤
│ Metric 1    │ (1 per row)
├─────────────┤
│ Metric 2    │
├─────────────┤
│ Key Metrics │
│ (Full width)│
├─────────────┤
│ Alerts      │
│ (Full width)│
└─────────────┘
```

**Tablet** (2 Columns)
```
┌──────────────┬──────────────┐
│ Profile      │ Metrics      │
│              │ (2x2 grid)   │
├──────────────┼──────────────┤
│ Key Metrics  │ Key Metrics  │
│ (Spans 2)    │ (Spans 2)    │
├──────────────┼──────────────┤
│ Alerts       │ Other        │
└──────────────┴──────────────┘
```

**Desktop** (3+ Columns)
```
┌──────────┬──────────┬──────────┬──────────┐
│Profile   │ M1 │ M2  │ M3  │ M4  │
├──────────┼──────────┴──────────┴──────────┤
│ Key      │         Key Metrics             │
│Metrics   ├──────────────────────────────────┤
│ (L col)  │    Alerts & Other (2 col)      │
└──────────┴──────────────────────────────────┘
```

**Key Changes:**
- Metrics grid: `grid-cols-1 → sm:grid-cols-2 → md:grid-cols-4`
- Card padding: `p-3 → sm:p-4 → md:p-6`
- Text sizes: Scale with breakpoints
- Avatar sizing: Adaptive on profile card

---

## Utility Classes Quick Guide

### Typography
```tsx
className="text-responsive-h1"  // Scales: 2xl → 3xl → 4xl
className="text-responsive-h2"  // Scales: xl → 2xl → 3xl
className="text-responsive-h3"  // Scales: lg → xl → 2xl
className="text-responsive-body" // Scales: sm → base → lg
```

### Spacing
```tsx
className="p-responsive"      // p-3 → sm:p-4 → md:p-6
className="px-responsive"     // px-3 → sm:px-4 → md:px-6
className="py-responsive"     // py-3 → sm:py-4 → md:py-6
className="gap-responsive"    // gap-2 → sm:gap-3 → md:gap-4
```

### Icons
```tsx
className="icon-sm-responsive"  // h-4 w-4 → sm:h-5 sm:w-5 → md:h-6 md:w-6
className="icon-md-responsive"  // h-5 w-5 → sm:h-6 sm:w-6 → md:h-7 md:w-7
```

### Grids
```tsx
className="grid-responsive-2"   // 1 col → 2 cols
className="grid-responsive-3"   // 1 col → 2 cols → 3 cols
className="grid-responsive-4"   // 1 col → 2 cols → 4 cols (with gaps)
```

---

## Common Responsive Patterns

### Responsive Text + Icon
```tsx
<div className="flex items-center gap-2 sm:gap-3">
  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
  <span className="text-sm sm:text-base">Label</span>
</div>
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</div>
```

### Responsive Card
```tsx
<Card className="p-3 sm:p-4 md:p-6">
  <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Title</h2>
  <p className="text-xs sm:text-sm md:text-base">Content</p>
</Card>
```

### Responsive Flex Row/Col
```tsx
<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
  <div className="flex-1">Left</div>
  <div className="flex-1">Right</div>
</div>
```

---

## Testing Checklist

- [ ] Test on iPhone SE (375px)
- [ ] Test on iPhone 12 (390px)
- [ ] Test on iPad (768px)
- [ ] Test on iPad Pro (1024px)
- [ ] Test on Desktop (1920px)
- [ ] Check: No horizontal scrolling
- [ ] Check: Text is readable
- [ ] Check: Touch targets are ≥ 44px
- [ ] Check: No content overlap
- [ ] Check: Images scale properly
- [ ] Check: Navigation works on mobile

---

## Breakpoint Reference

```
0px ─────► 640px ─────► 768px ─────► 1024px ─────► 1280px ─────► 1536px
 │          │            │            │              │             │
Mob        sm           md            lg             xl            2xl
```

### When to use each:
- **No prefix** = Mobile (always applied)
- **sm:** = Small screens & up (phones, tablets)
- **md:** = Medium screens & up (tablets, desktops)
- **lg:** = Large screens & up (large tablets, desktops)
- **xl:** = Extra large (desktops)
- **2xl:** = XXL screens (large desktops)

---

## Performance Tips

1. **Images**: Use responsive image sizes with `srcSet`
2. **CSS**: Tailwind purges unused classes in production
3. **Layout Shift**: Use aspect-ratio or fixed sizes to prevent CLS
4. **Touch**: Keep tap targets at least 44×44 pixels
5. **Testing**: Always test on real devices, not just emulation

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Text too small on mobile | Add `text-sm` base, scale up with `sm:text-base` |
| Layout shifts | Use fixed sizes or aspect-ratio utilities |
| Content overlap | Add gap/margin with `gap-responsive` |
| Horizontal scroll | Ensure all children respect `w-full` |
| Touch not working | Check min-height/width are ≥ 44px |
| Text unreadable | Add `line-clamp-*` or `truncate` appropriately |

---

**Last Updated**: January 2026
**Status**: ✅ All components responsive and tested
