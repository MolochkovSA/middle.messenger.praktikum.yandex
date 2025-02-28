export const inputTemplate = `
  <input 
    id="{{id}}" 
    type="{{type}}" 
    name="{{name}}" 
    class="{{className}}" 
    placeholder="{{placeholder}}" 
    value="{{value}}"

    {{#if validator}}
      data-validator="{{validator}}"
    {{/if}}

    {{#if disabled}}
      disabled
    {{/if}}
  />
`
