export default class StyleInlineTool {
  static get isInline() {
    return true;
  }

  constructor({ api }) {
    this.api = api;
    this.button = null;
    this.tag = 'SPAN';
    this.classes = {
      tool: this.api.styles.inlineTool,
    };
    this._CSS = {
      wrapper: 'ce-inline-tool',
    };
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = '🖋️';
    this.button.classList.add(this._CSS.wrapper);

    // Create dropdown
    this.dropdown = document.createElement('select');
    this.dropdown.style.marginLeft = '4px';
    this.dropdown.innerHTML = this._getOptionsHTML();

    this.dropdown.addEventListener('change', () => {
      this._applyStyle(this.dropdown.value);
    });

    const wrapper = document.createElement('span');
    wrapper.appendChild(this.button);
    wrapper.appendChild(this.dropdown);
    return wrapper;
  }

  _getOptionsHTML() {
    return `
      <option value="">Style</option>
      <optgroup label="Font Family">
        <option value="font-family: Inter, sans-serif;">Inter</option>
        <option value="font-family: Georgia, serif;">Georgia</option>
        <option value="font-family: Courier New, monospace;">Courier New</option>
        <option value="font-family: Roboto, sans-serif;">Roboto</option>
        <option value="font-family: Times New Roman, serif;">Times New Roman</option>
        <option value="font-family: Helvetica, sans-serif;">Helvetica</option>
      </optgroup>
      <optgroup label="Font Size">
        <option value="font-size: 12px;">Small (12px)</option>
        <option value="font-size: 14px;">Normal (14px)</option>
        <option value="font-size: 16px;">Large (16px)</option>
        <option value="font-size: 18px;">Subtitle (18px)</option>
        <option value="font-size: 24px;">Heading (24px)</option>
      </optgroup>
      <optgroup label="Font Color">
        <option value="color: #000000;">Black</option>
        <option value="color: #374151;">Charcoal Gray</option>
        <option value="color: #1D4ED8;">Blue</option>
        <option value="color: #DC2626;">Red</option>
        <option value="color: #059669;">Green</option>
        <option value="color: #D97706;">Orange</option>
      </optgroup>
    `;
  }

  surround(range) {
    if (!range || range.collapsed) return;

    const selectedText = range.extractContents();
    const span = document.createElement(this.tag);
    span.appendChild(selectedText);
    range.insertNode(span);
    this.api.selection.expandToTag(span);
  }

  _applyStyle(style) {
    const range = window.getSelection().getRangeAt(0);
    if (!range || range.collapsed) return;

    const selectedElement = range.commonAncestorContainer.parentNode;
    if (selectedElement && selectedElement.tagName === this.tag) {
      selectedElement.style = `${selectedElement.style.cssText}; ${style}`;
    }
  }

  checkState() {
    const selected = window.getSelection();
    if (!selected || selected.rangeCount === 0) return false;

    const anchor = selected.anchorNode;
    if (!anchor || !anchor.parentElement) return false;

    return anchor.parentElement.tagName === this.tag;
  }

  static get sanitize() {
    return {
      span: {
        class: true,
        style: true,
      },
    };
  }
}
