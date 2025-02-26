export const inputTemplate = `
  <input 
    id="{{id}}" 
    type="{{type}}" 
    name="{{name}}" 
    class="{{className}}" 
    placeholder="{{placeholder}}" 
    value="{{value}}"
     
    {{#if disabled}}
      disabled
    {{/if}}
  />
`
