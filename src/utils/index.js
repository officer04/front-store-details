export function formatPrice(price) {
  // Преобразовываем цену в строку
  price = price.toString();

  // Разделяем строку на тысячные и остальные цифры
  let parts = price.split('.');
  let integerPart = parts[0];
  let decimalPart = parts[1] ? '.' + parts[1] : '';

  // Разделяем тысячные цифры
  let formattedPrice = '';
  for (let i = 0; i < integerPart.length; i++) {
    if (i > 0 && (integerPart.length - i) % 3 === 0) {
      formattedPrice += ' ';
    }
    formattedPrice += integerPart[i];
  }

  // Возвращаем отформатированную цену
  return formattedPrice + decimalPart;
}
